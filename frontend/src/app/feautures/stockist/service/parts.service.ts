import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClient } from '@app/app.component';
import { Parts } from '@app/feautures/common-views/models/parts.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  endpoint = environment.server;

  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }

  public save(parts: Parts): Observable<any> {
    return this.httpClient.post(this.endpoint + 'parts/save', parts, { responseType: 'text' }).pipe(retry(1));
  }

  public update(parts: Parts): Observable<any> {
    return this.httpClient.put(this.endpoint + 'parts/update', parts, { responseType: 'text' }).pipe(retry(1));
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(environment.server.concat(`parts/getAll`)).pipe(retry(1));
  }

  public getFile(filename: string) {
    return this.httpClient.get(environment.server.concat(`parts/getFile/${filename}`), { responseType: 'blob' });
  }

  public getHistoric(parts: Parts): Observable<any> {
    return this.httpClient.get(this.endpoint + `parts/historic/${parts.id}`).pipe(retry(1));
  }
}
