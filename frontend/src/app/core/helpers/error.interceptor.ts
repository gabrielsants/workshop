import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, private _snackBar: MatSnackBar) {}

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            this.openSnackBar('Error Event', 'close');
          } else {
            this.openSnackBar(`error status : ${error.status} ${error.statusText}`, 'close');
            switch (error.status) {
              case 401:
                console.log('401');
                this.router.navigate(['login']);
                break;
              case 403:
                this.router.navigate(['login']);
                break;
            }
          }
        } else {
          this.openSnackBar('Ops.. Something went wrong!', 'close');
        }
        return throwError(error.message);
      })
    );
  }
}
