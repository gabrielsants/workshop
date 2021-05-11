import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logger } from '@app/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
}

const log = new Logger('Authentication');

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    // Replace by proper authentication call
    console.log(context);

    const promise = new Promise((resolve, reject) => {
      this.httpClient
        .post('http://localhost:3000/auth/login', context)
        .toPromise()
        .then(
          (res) => {
            console.log(res);
            const data = {
              username: context.username,
              token: res['access_token'],
            };
            // this.credentialsService.setCredentials(data, true);
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });

    // const data = {
    //   username: context.username,
    //   token: '123456',
    // };
    // this.credentialsService.setCredentials(data, context.remember);
    return of(promise);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  // *********************************************

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  _logout() {
    localStorage.removeItem('access_token');
  }

  _login(username: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<{ token: string }>('http://localhost:3000/auth/login', { username: username, password: password })
      .pipe(
        map((result) => {
          const data = {
            username: result['full_name'],
            access_token: result['access_token'],
            role: result['role'],
          };
          this.credentialsService.setCredentials(data, true);
          return true;
        })
      );
  }
}
