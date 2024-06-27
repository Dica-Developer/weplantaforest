import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private platformHelper: PlatformHelper) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      httpRequest.clone({
        setHeaders: {
          'X-AUTH-TOKEN': this.platformHelper.getLocalstorage('jwt') ? this.platformHelper.getLocalstorage('jwt') : 'anonym-user',
        },
      }),
    );
  }
}
