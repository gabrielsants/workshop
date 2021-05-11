import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FileService } from '@app/feautures/admin/services/file.service';
import { File } from '@app/feautures/common/models/file.model';
import { DownloadService } from '../../service/download.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements AfterViewInit {

  constructor(private fileService: FileService, public router: Router, private dowloadService : DownloadService) {
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
    this.fileService.getReportCards().subscribe((res) => {
      this.dataSource = new MatTableDataSource<File>(res);
      res.map((file: File) => {
        this.files.push(file);
      });
    });
  }

  viewFile(filename: string) {
    this.router.navigate(['/list-files/view'], {
      state: {
        data: filename 
      }
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  download(filename : string) {
    this.dowloadService.downloadFile(filename).subscribe(res => {
      let blob = new Blob([res], {type: 'application/pdf'});
      let downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = `${filename}`;
      link.click();
    })
  }
  
}
