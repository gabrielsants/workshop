import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UploadService } from '../../services/upload.service';

interface Product {
  name: string;
  id: number;
}

interface ProductLine {
  name: string;
  id: number;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  selectedFiles: FileList;
  fileName: string = '';
  uploadForm!: FormGroup;
  linkFile: boolean = false;
  isLoading = false;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {}

  onFileSelected(event: { target: { files: File[] } }) {
    console.log('file select');
    this.isLoading = true;
    const file: File = event.target.files[0];

    if (file) {
      this.uploadService.upload(file).then((res) => (this.fileName = res.filename));
    }
    this.isLoading = false;
  }
}
