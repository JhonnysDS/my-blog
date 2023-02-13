import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ServerErrorComponent } from '../server-error/server-error.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.router.navigate(['/server-error'])
        }

        return throwError(error);
      })
    );
  }
}
