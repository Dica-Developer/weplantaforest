import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AppState } from './store/app.state';
import { selectErrors, removeError } from './store/error.state';
import { selectSuccessMessages, removeSuccessMessage } from './store/success-message.state';
import { loadProfileDetails } from './store/profile.store';
import { getProjectsForCustomPlanting } from './store/plant.store';
import { Subscription } from 'rxjs';
import { CookieHelper } from './util/helper/cookie.helper';
import { PlatformHelper } from './util/helper/platform.helper';
import { LanguageHelper } from './util/helper/language.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.platformHelper.setLocalstorage('previousUrl', this.router.url);
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
    private platformHelper: PlatformHelper,
    private languageHelper: LanguageHelper
  ) {
    this.translateService.addLangs(['de', 'en']);
    this.translateService.use(this.languageHelper.getUserLanguage());
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
    if (this.platformHelper.getLocalstorage('jwt') && this.platformHelper.getLocalstorage('username')) {
      this.store.dispatch(loadProfileDetails({ username: this.platformHelper.getLocalstorage('username') }));
    }
    this.authService.autoLogin();
    this.cookieHelper.openCookieConfirmation();
  }

  ngOnDestroy() {
    if (this.platformHelper.checkIfBrowser()) {
      this.languageSub.unsubscribe();
      this.translateSub.unsubscribe();
    }
  }
}
