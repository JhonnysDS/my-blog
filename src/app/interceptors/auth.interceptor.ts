import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token'); // get the token from local storage
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken).
        append('Content-Type', 'application/json').
        append('Content-Type', 'text/plain'),
    });
    return next.handle(authReq);
  }
}

