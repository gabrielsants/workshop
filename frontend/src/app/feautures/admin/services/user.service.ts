import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClient } from '@app/app.component';
import { Department } from '@app/feautures/common/models/department.model';
import { Role } from '@app/feautures/common/models/role.model';
import { User } from '@app/feautures/common/models/user.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = environment.server;

  constructor(private httpClient: HttpClient) {
    this.httpClient = AppHttpClient;
  }

  public getUsers(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'users').pipe(retry(1));
  }

  public saveUser(user: User): Observable<any> {
    console.log('save');
    return this.httpClient.post(this.endpoint + 'users/save', user, { responseType: 'text' }).pipe(retry(1));
  }

  public updateUser(user: User): Observable<any> {
    return this.httpClient.put(this.endpoint + 'users/update', user, { responseType: 'text' }).pipe(retry(1));
  }

  public getRoles(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'roles').pipe(retry(1));
  }

  public saveRole(role: Role): Observable<any> {
    return this.httpClient.post(this.endpoint + 'roles/save', role, { responseType: 'text' }).pipe(retry(1));
  }

  public updateRole(role: Role): Observable<any> {
    return this.httpClient.put(this.endpoint + 'role/update', role, { responseType: 'text' }).pipe(retry(1));
  }

  public getDepartments(): Observable<any> {
    return this.httpClient.get(this.endpoint + 'departments').pipe(retry(1));
  }

  public saveDepartment(department: Department): Observable<any> {
    return this.httpClient
      .post(this.endpoint + 'departments/save', department, { responseType: 'text' })
      .pipe(retry(1));
  }

  public updateDepartment(department: Department): Observable<any> {
    console.log('update : ', department);
    return this.httpClient
      .put(this.endpoint + 'departments/update', department, { responseType: 'text' })
      .pipe(retry(1));
  }
}
