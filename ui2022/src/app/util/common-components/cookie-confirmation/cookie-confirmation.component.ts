import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { acceptCookies, declineCookies } from 'src/app/store/infrastructure.store';

@Component({
  selector: 'app-cookie-confirmation',
  templateUrl: './cookie-confirmation.component.html',
  styleUrls: ['./cookie-confirmation.component.scss'],
})
export class CookieConfirmationComponent implements OnInit {
  constructor(
    private snackBarRef: MatSnackBarRef<CookieConfirmationComponent>,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {}

  acceptCookies() {
    this.store.dispatch(acceptCookies());
    this.snackBarRef.dismiss();
  }

  rejectCookies() {
    this.store.dispatch(declineCookies());
    this.snackBarRef.dismiss();
  }
}
