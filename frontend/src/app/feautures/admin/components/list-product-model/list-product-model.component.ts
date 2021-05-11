import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductModel } from '@app/feautures/common/models/product-model.model';
import { DialogHistoricService } from '@app/shared/service/dialog-historic.service';
import { DialogService } from '@app/shared/service/dialog.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product-model',
  templateUrl: './list-product-model.component.html',
  styleUrls: ['./list-product-model.component.scss'],
})
export class ListProductModelComponent implements AfterViewInit {
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private dialogHService: DialogHistoricService, 
    private _snackBar: MatSnackBar
  ) {
    this.init();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'product', 'name', 'isActive', '*'];
  dataSource = new MatTableDataSource<ProductModel>();
  productModel: ProductModel = null;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  private async init() {
    this.productService.getProductAndModels().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ProductModel>(res);
    });
  }

  public isActiveToNaturalLanguague(row: ProductModel): string {
    if (row.isActive == true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  disableButton(row: ProductModel): boolean {
    if (row.isActive == true) {
      return false;
    }
    return true;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(productModel: ProductModel): void {
    const dialogRef = this.dialog.open(EditProductModel, { width: '300px', height: 'auto', data: productModel });
    dialogRef.afterClosed().subscribe((res) => {
      // this.logger.debug(`The dialog was closed`);
      this.productModel = res;
    });
  }

  public disableProductModel(productModel: ProductModel) {
    const opttions = {
      title: 'Desabilitar modelo',
      message: `Deseja desabilitar ${productModel.name}?`,
      cancelText: 'Cancelar',
      confirmText: 'Confirmar',
    };
    this.dialogService.open(opttions);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        productModel.isActive = false;
        this.productService.updateProductLine(productModel).subscribe((res) => {
          this.openSnackBar(res, 'close');
        });
      }
    });
  }

  public openHistoric(row: ProductModel) {
    this.productService.getProductsLineHistoric(row).subscribe((res) => {
      const options = {
        title: 'Historico',
        list: res,
      };
      this.dialogHService.open(options);
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

@Component({
  selector: 'edit-department',
  templateUrl: './edit-product-model.html',
})
export class EditProductModel {
  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProductModel>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(name: string) {
    this.data.name = name;
    this.productService.updateProductLine(this.data).subscribe((res) => {
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
