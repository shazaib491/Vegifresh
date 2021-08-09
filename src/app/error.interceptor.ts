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
import { ToasterService } from './services/toaster.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toasterService:ToasterService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    var controller = new AbortController();

    return next.handle(request).pipe(
      tap(evt=>{
        if (evt instanceof HttpResponse) {
          if(evt.body  && evt.body.token){
            this.toasterService.successDom(evt.body.message);
          }

          if(evt.status===201){
            this.toasterService.generalDom(evt.body.message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);

        if(error.status==401){

          this.toasterService.errorDom(error.error.message);
          controller.abort();
        }

        return throwError(error);
      })
    );
  }
}
