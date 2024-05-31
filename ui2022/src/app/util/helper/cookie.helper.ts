import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieConfirmationComponent } from 'src/app/util/common-components/cookie-confirmation/cookie-confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class CookieHelper {
  constructor(private snackBar: MatSnackBar) {}

  openCookieConfirmation() {
    this.snackBar.openFromComponent(CookieConfirmationComponent, {
      panelClass: ['cookie-snackbar'],
    });
  }
}
