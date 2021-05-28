import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@app/feautures/common-views/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements AfterViewInit {
  constructor(private productService: ProductService, public dialog: MatDialog) {
    this.init();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', '*'];
  dataSource = new MatTableDataSource<Product>();
  product: Product = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  private init() {
    this.productService.getProducts().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Product>(res);
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProduct, { width: '300px', height: 'auto', data: product });
    dialogRef.afterClosed().subscribe((res) => {
      this.product = res;
    });
  }
}

@Component({
  selector: 'edit-department',
  templateUrl: './edit-product.html',
})
export class EditProduct {
  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Product>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(name: string) {
    this.data.name = name;
    this.productService.updateProduct(this.data).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
