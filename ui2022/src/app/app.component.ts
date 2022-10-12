import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectErrors, removeError } from './store/error.state';
import {
  selectSuccessMessages,
  removeSuccessMessage,
} from './store/success-message.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    localStorage.setItem('previousUrl', this.router.url);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (localStorage.getItem('jwt')) {
      const previousUrl = localStorage.getItem('previousUrl');
      if (previousUrl && previousUrl !== '/login') {
        this.router.navigate([previousUrl]);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
    }
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
