import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = localStorage.getItem('access_token');

    const isApiUrl = request.url.startsWith('http://localhost:3000/api');
    const isAuth = request.url.startsWith('http://localhost:3000/auth/profile');
    const isUpload = request.url.startsWith('http://localhost:3000/file-upload');

    if (credentials && (isApiUrl || isAuth) && !isUpload) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${credentials}`,
        },
      });
    }

    if (isUpload && credentials) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${credentials}`,
          Accept: 'application/json',
        },
      });
    }

    return next.handle(request);
  }
}
