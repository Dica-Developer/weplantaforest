import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AppState } from './store/app.state';
import { selectErrors, removeError } from './store/error.state';
import { selectSuccessMessages, removeSuccessMessage } from './store/success-message.state';
import { AppCookieService } from './util/cookie.service';
import { loadProfileDetails } from './store/profile.store';
import { getProjectsForCustomPlanting } from "./store/plant.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    localStorage.setItem('previousUrl', this.router.url);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: AppCookieService,
    private authService: AuthService,
    private translateService: TranslateService,
  ) {
    this.cookieService.init();
    this.translateService.setDefaultLang('de');
    this.translateService.use('de');
    //comment in for dev-purpose: to avoid manually routing back to page, where you work after each codechange
    // const previousUrl = localStorage.getItem('previousUrl');
    // if (localStorage.getItem('jwt')) {
    //   console.log(previousUrl);

    //   if (previousUrl && previousUrl !== '/login') {
    //     this.router.navigate([previousUrl]);
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    // }
    this.store.select(selectErrors).subscribe((errors) => {
      for (let error of errors) {
        this.snackBar
          .open(this.translateService.instant(error.message), 'X', {
            duration: 4000,
          })
          .afterDismissed()
          .subscribe((res) => {
            this.store.dispatch(removeError({ key: error.key }));
          });
      }
    });
    this.store.select(selectSuccessMessages).subscribe((messages) => {
      for (let message of messages) {
        this.snackBar
          .open(this.translateService.instant(message.message), 'X', {
            duration: 4000,
            panelClass: ['success-snackbar'],
          })
          .afterDismissed()
          .subscribe((res) => {
            this.store.dispatch(removeSuccessMessage({ key: message.key }));
          });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(getProjectsForCustomPlanting());
    if (localStorage.getItem('jwt') && localStorage.getItem('username')) {
      this.store.dispatch(loadProfileDetails({ username: localStorage.getItem('username') }));
    }

    this.authService.autoLogin();
  }
}
