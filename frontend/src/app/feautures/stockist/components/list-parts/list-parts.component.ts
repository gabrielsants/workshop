import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '@app/feautures/admin/services/product.service';
import { Parts } from '@app/feautures/common-views/models/parts.model';
import { ProductModel } from '@app/feautures/common-views/models/product-model.model';
import { PartsService } from '../../service/parts.service';

@Component({
  selector: 'app-list-parts',
  templateUrl: './list-parts.component.html',
  styleUrls: ['./list-parts.component.scss'],
})
export class ListPartsComponent implements AfterViewInit {
  constructor(
    private partsService: PartsService,
    private _snackBar: MatSnackBar,
    private productService: ProductService
  ) {
    this.loadData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'productModel', '*'];
  dataSource = new MatTableDataSource<Parts>();

  private parts: Parts[] = [];

  filterSelectObj: ProductModel[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  public reload() {
    this.loadData();
  }

  private loadData() {
    this.partsService.getAll().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Parts>(res);
      res.map((parts: Parts) => {
        this.parts.push(parts);
      });
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: Parts, filter: string) => {
      const textToSearch = (d[column] && d[column].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  // applyFilter(filterValue : string) {
  //   this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  // }
}
