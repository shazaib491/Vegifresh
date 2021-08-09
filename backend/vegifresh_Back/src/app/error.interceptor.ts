import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var controller = new AbortController();

    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.token) {
            this._snackBar.open(evt.body.message, `X`, {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['bg-success'],
              duration: 1000
            });
          }

          if (evt.status === 201) {
            this._snackBar.open(evt.body.message, `X`, {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['bg-primary'],
              duration: 1000
            });
          }


          // if (evt.status === 200) {
          //   this._snackBar.open(evt.body.message, `X`, {
          //     horizontalPosition: this.horizontalPosition,
          //     verticalPosition: this.verticalPosition,
          //     panelClass: ['bg-warning']
          //   });
          // }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);

        if (error.status == 401) {
          this._snackBar.open(error.error.message, `Close`, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['bg-danger'],
            duration: 1000
          });
        }

        return throwError(error);
      })
    );
  }
}
