import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      httpRequest.clone({
        setHeaders: {
          'X-AUTH-TOKEN': localStorage.getItem('jwt') ? localStorage.getItem('jwt') : '',
        },
      }),
    );
  }
}
