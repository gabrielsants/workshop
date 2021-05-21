import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClient } from '@app/app.component';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  endpoint = environment.server;

  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }

  public downloadFile(filename: string) {
    return this.httpClient.get(environment.server.concat(`file/download/${filename}`), { responseType: 'blob' });
  }
}
