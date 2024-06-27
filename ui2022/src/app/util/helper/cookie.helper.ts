import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieConfirmationComponent } from 'src/app/util/common-components/cookie-confirmation/cookie-confirmation.component';
import { PlatformHelper } from './platform.helper';
import { acceptCookies, declineCookies } from 'src/app/store/infrastructure.store';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CookieHelper {
  constructor(private snackBar: MatSnackBar, private store: Store<AppState>, private platformHelper: PlatformHelper) {}

  openCookieConfirmation() {
    this.snackBar.openFromComponent(CookieConfirmationComponent, {
      panelClass: ['cookie-snackbar'],
    });
  }

  autoOpenCookieConfirmation() {
    const cookies = this.platformHelper.getLocalstorage('cookies');
    if (cookies === null) {
      this.openCookieConfirmation()
    } else if (cookies === 'false') {
      this.store.dispatch(declineCookies())
    } else if (cookies === 'true') {
      this.store.dispatch(acceptCookies())
    }
  }
}
