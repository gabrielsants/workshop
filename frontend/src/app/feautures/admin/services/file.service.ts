import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClient } from '@app/app.component';
import { File } from '@app/feautures/common/models/file.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }

  public getFile(filename: string) {
    return this.httpClient.get(environment.server.concat(`file/getFile/${filename}`), { responseType: 'blob' });
  }

  public getFilesNotLinked(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getFilesNotLinked')).pipe(retry(1));
  }

  public getAllFiles(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getAll')).pipe(retry(1));
  }

  public getFilesTMO(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getTMOs')).pipe(retry(1));
  }

  public getReportCards(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getReportCards')).pipe(retry(1));
  }

  public getFilesOperators(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getOperators')).pipe(retry(1));
  }

  public getFilesCatalogs(): Observable<any> {
    return this.httpClient.get(environment.server.concat('file/getCatalogs')).pipe(retry(1));
  }

  public updateFile(file: File): Observable<any> {
    return this.httpClient.put(environment.server.concat('file/update'), file, { responseType: 'text' }).pipe(retry(1));
  }
}
