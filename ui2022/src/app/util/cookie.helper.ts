import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { CookieConfirmationComponent } from './common-components/cookie-confirmation/cookie-confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class CookieHelper {
  constructor(private snackBar: MatSnackBar) {}

  openCookieConfirmation() {
    this.snackBar.openFromComponent(CookieConfirmationComponent, {
      panelClass: ['custom-snackbar'],
    });
  }
}
