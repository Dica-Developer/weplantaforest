import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AppState } from './store/app.state';
import { selectErrors, removeError } from './store/error.state';
import { selectSuccessMessages, removeSuccessMessage } from './store/success-message.state';
import { loadProfileDetails, selectUserLanguage } from './store/profile.store';
import { getProjectsForCustomPlanting } from './store/plant.store';
import { Subscription } from 'rxjs';
import { CookieHelper } from './util/cookie.helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    localStorage.setItem('previousUrl', this.router.url);
  }

  languageSub: Subscription;
  translateSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private translateService: TranslateService,
    private cookieHelper: CookieHelper,
  ) {
    this.translateService.addLangs(['de', 'en']);
    this.languageSub = this.store.select(selectUserLanguage).subscribe((language) => {
      if (language === 'ENGLISH' || language === 'en') {
        this.translateService.use('en');
      } else if (language === 'DEUTSCH' || language === 'de') {
        this.translateService.use('de');
      }
    });
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
    this.cookieHelper.openCookieConfirmation();
  }

  ngOnDestroy() {
    this.languageSub.unsubscribe();
    this.translateSub.unsubscribe();
  }
}
