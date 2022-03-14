import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { selectJwtToken } from '../../store/auth.store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  jwtToken: string;

  constructor(private store: Store<AppState>) {
    store.select(selectJwtToken).subscribe((token) => {
      this.jwtToken = token;
    });
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(this.jwtToken){
      return next.handle(
        httpRequest.clone({ setHeaders: { 'X-AUTH-TOKEN': this.jwtToken } })
      );
    }else {
      return next.handle(httpRequest);
    }
  }
}
