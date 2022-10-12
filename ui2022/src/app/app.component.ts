import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { selectLoggedIn, selectJwtToken } from './store/auth.store';
import { selectErrors, removeError } from './store/error.state';
import { selectSuccessMessages, removeSuccessMessage } from './store/success-message.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  token$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router, private snackBar: MatSnackBar) {
    this.loggedIn$ = store.select(selectLoggedIn);
    this.token$ = store.select(selectJwtToken);
    console.log(this.router.url);
    // this.loggedIn$.subscribe((res) => {

    //   if (!this.router.url.includes('password_reset')) {
    //     if (res) {
    //       this.router.navigate(['/backOffice2022/carts']);
    //     } else {
    //       this.router.navigate(['/login']);
    //     }
    //   }
    // });
    this.store.select(selectErrors).subscribe((errors) => {
      for (let error of errors) {
        this.snackBar
          .open(error.message, 'X')
          .afterDismissed()
          .subscribe((res) => {
            this.store.dispatch(removeError({ key: error.key }));
          });
      }
    });
    this.store.select(selectSuccessMessages).subscribe((messages) => {
      for (let message of messages) {
        this.snackBar
          .open(message.message, 'X', { panelClass: ['success-snackbar'] })
          .afterDismissed()
          .subscribe((res) => {
            this.store.dispatch(removeSuccessMessage({ key: message.key }));
          });
      }
    });
  }
}
