import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FileService } from '@app/feautures/admin/services/file.service';
import { File } from '@app/feautures/common-views/models/file.model';

@Component({
  selector: 'app-list-tmo',
  templateUrl: './list-tmo.component.html',
  styleUrls: ['./list-tmo.component.scss'],
})
export class ListTmoComponent implements AfterViewInit {
  constructor(private fileService: FileService, public router: Router) {
    this.loadData();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'filename', 'productModel', '*'];
  dataSource = new MatTableDataSource<File>();

  private files: File[] = [];

  public reload() {
    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  private loadData() {
    this.fileService.getFilesTMO().subscribe((res) => {
      this.dataSource = new MatTableDataSource<File>(res);
      res.map((file: File) => {
        this.files.push(file);
      });
    });
  }

  viewFile(filename: string) {
    this.router.navigate(['/list-files/view'], {
      state: {
        data: filename,
      },
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
