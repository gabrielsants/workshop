import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '@app/feautures/admin/services/file.service';
import { PDFSource, PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss'],
})
export class ViewFileComponent implements OnInit {
  constructor(private fileService: FileService, private route: ActivatedRoute) {
    console.log('im alive');
  }

  @ViewChild(PdfViewerComponent)
  private pdfComponent: PdfViewerComponent;

  pdfSrc: string | PDFSource | ArrayBuffer = './assets/pdf-test.pdf';

  ngOnInit(): void {
    let filename = history.state.data;
    console.log(history.state.data);

    this.fileService.getFile(filename).subscribe((res) => {
      let _file = new Blob([res], { type: 'application/pdf' });
      this.pdfSrc = URL.createObjectURL(_file);
    });
  }
}
