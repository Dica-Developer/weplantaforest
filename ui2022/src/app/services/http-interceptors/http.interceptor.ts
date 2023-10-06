import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addError } from '../../store/error.state';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 500:
            this.handleError500();
            break;
          case 400:
            break;
          case 401:
            break;
          case 0:
            this.handleError0(error);
            break;
          default:
            this.handleError(error);
            break;
        }
        return throwError(error);
      }),
    );
  }

  handleError(error) {
    // const translateService = this.injector.get(TranslateService);
    if (error.error && error.error.message) {
      //   this.toastService.show(translateService.instant('error.' + error.error.message), {
      //     classname: 'bg-danger text-light',
      //     delay: 5000,
      //     autohide: true,
      //   });
    } else if (error.error && error.error.error) {
      //   this.toastService.show(translateService.instant('error.' + error.error.error), {
      //     classname: 'bg-danger text-light',
      //     delay: 5000,
      //     autohide: true,
      //   });
    } else {
      this.handleError500();
    }
  }

  handleError500() {
    this.store.dispatch(
      addError({
        error: { message: 'Ein unerwarteter Fehler ist aufgetreten.', key: 'UNKNOWN_ERROR' },
      }),
    );
    // const translateService = this.injector.get(TranslateService);
    // this.toastService.show(translateService.instant('error.UNKNOWN_ERROR'), {
    //   classname: 'bg-danger text-light',
    //   delay: 5000,
    //   autohide: true,
    // });
  }

  handleError0(error: any) {
    console.log(error);
  }
}
