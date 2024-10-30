import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { PlatformHelper } from '../../helper/platform.helper';
import { logout, softDeleteAccount } from 'src/app/store/auth.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-delete-confirmation',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './account-delete-confirmation.component.html',
  styleUrl: './account-delete-confirmation.component.scss'
})
export class AccountDeleteConfirmationComponent {

  constructor(
    private snackBarRef: MatSnackBarRef<AccountDeleteConfirmationComponent>,
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
  ) {}

  ngOnInit(): void {}

  softDeleteAccount() {
    let username = this.platformHelper.getLocalstorage('username');
    this.store.dispatch(softDeleteAccount({username: username}))
    this.snackBarRef.dismiss();
  }

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
