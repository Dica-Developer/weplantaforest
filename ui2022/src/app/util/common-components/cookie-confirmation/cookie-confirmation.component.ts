import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { acceptCookies, declineCookies } from 'src/app/store/infrastructure.store';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from '../../helper/platform.helper';

@Component({
    selector: 'app-cookie-confirmation',
    templateUrl: './cookie-confirmation.component.html',
    styleUrls: ['./cookie-confirmation.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule],
})
export class CookieConfirmationComponent implements OnInit {
  constructor(
    private snackBarRef: MatSnackBarRef<CookieConfirmationComponent>,
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
  ) {}

  ngOnInit(): void {}

  acceptCookies() {
    this.store.dispatch(acceptCookies());
    this.platformHelper.setLocalstorage('cookies', 'true');
    this.snackBarRef.dismiss();
  }

  rejectCookies() {
    this.store.dispatch(declineCookies());
    this.platformHelper.setLocalstorage('cookies', 'false');
    this.snackBarRef.dismiss();
  }
}
