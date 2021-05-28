import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Logger } from '@app/core';
import { File } from '@app/feautures/common-views/models/file.model';
import { ProductModel } from '@app/feautures/common-views/models/product-model.model';
import { Product } from '@app/feautures/common-views/models/product.model';
import { FileService } from '../../services/file.service';
import { ProductService } from '../../services/product.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-link-file',
  templateUrl: './link-file.component.html',
  styleUrls: ['./link-file.component.scss'],
})
export class LinkFileComponent implements AfterViewInit {
  constructor(private fileService: FileService, public dialog: MatDialog) {
    this.init();
  }

  kinds = [
    { id: 0, viewValue: 'TMO' },
    { id: 1, viewValue: 'OPERATOR' },
    { id: 2, viewValue: 'CATALOG' },
    { id: 3, viewValue: 'REPORT CARD' },
  ];

  public file: File;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'filename', 'productModel', '*'];
  dataSource = new MatTableDataSource<File>();

  private init() {
    this.fileService.getFilesNotLinked().subscribe((res) => {
      this.dataSource = new MatTableDataSource<File>(res);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  setFile(_file: File): void {
    this.file = _file;
    this.openLink();
  }

  openEdit(): void {
    const dialogRef = this.dialog.open(DialogEdit, { width: '250px', data: this.file });
    dialogRef.afterClosed().subscribe((res) => {
      this.file = res;
    });
  }
  openLink(): void {
    const dialogRef = this.dialog.open(DialogLink, { width: 'auto', data: this.file });
    dialogRef.afterClosed().subscribe((res) => {
      this.file = res;
    });
  }

  getKind(rowId: number) {
    this.kinds.forEach((element) => {
      if (element.id == rowId) {
        return element.viewValue;
      }
    });
  }

  reload() {
    this.init();
  }
}

@Component({
  selector: 'dialog-edit',
  templateUrl: './templates/edit-file.html',
})
export class DialogEdit {
  constructor(public dialogRef: MatDialogRef<DialogEdit>, @Inject(MAT_DIALOG_DATA) public data: File) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-link',
  templateUrl: './templates/link-file.html',
})
export class DialogLink {
  constructor(
    private fileService: FileService,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogLink>,
    @Inject(MAT_DIALOG_DATA) public data: File
  ) {
    this.file = data;
    this.loadData();
  }

  file: File;
  products: Product[] = [];
  productLines: ProductModel[] = [];
  productSelected: Product = { id: 1, name: '' };
  productLineSelected: ProductModel;
  disabled: boolean = true;

  kinds = [
    { id: 0, viewValue: 'TMO' },
    { id: 1, viewValue: 'OPERATOR' },
    { id: 2, viewValue: 'CATALOG' },
    { id: 3, viewValue: 'REPORT CARD' },
  ];

  setProduct(product: Product): void {
    this.productSelected = product;
    this.disabled = false;
  }

  setProductLine(pLine: ProductModel): void {
    this.productLineSelected = pLine;
  }

  setFileKind(value: number) {
    this.file.kind = value;
  }

  filterProductLine() {
    return this.productLines.filter((x) => x.product.id == this.productSelected.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit() {
    this.file.productModel = this.productLineSelected;
    console.log(this.file);

    this.fileService.updateFile(this.file).subscribe((res) => {
      this.openSnackBar(res, 'close');
    });

    this.dialogRef.close();
  }

  private async loadData() {
    this.productService.getProducts().subscribe((res) => {
      res.map((_product: Product) => {
        this.products.push(_product);
      });
    });
    this.productService.getProductAndModels().subscribe((res) => {
      res.map((pModel: ProductModel) => {
        this.productLines.push(pModel);
      });
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
