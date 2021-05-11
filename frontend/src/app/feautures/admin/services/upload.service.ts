import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppHttpClient } from '@app/app.component';
import { environment } from '@env/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  SERVER_URL: string = 'http://localhost:3000/file-upload';
  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.SERVER_URL, data);
    return this.httpClient.request(newRequest);
  }

  upload(file: File): Promise<any> {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    console.log(file.name);

    const promise = new Promise((resolve, reject) => {
      this.httpClient
        .post(this.SERVER_URL, formData)
        .toPromise()
        .then(
          (res) => {
            console.log(res);
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });

    return promise;

    // return this.httpClient.post(this.SERVER_URL, formData, options).toPromise().catch((e)=> {console.log('something went wrong')});
  }
}
