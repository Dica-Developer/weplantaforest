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
import { loadProfileDetails, selectUserLanguage } from './store/profile.store';
import { getProjectsForCustomPlanting } from './store/plant.store';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    localStorage.setItem('previousUrl', this.router.url);
  }

  languageSub: Subscription;
  cookieTranslateSub: Subscription;

  constructor(
    private ccService: NgcCookieConsentService,
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: AppCookieService,
    private authService: AuthService,
    private translateService: TranslateService,
  ) {
    this.translateService.addLangs(['de', 'en']);
    this.languageSub = this.store.select(selectUserLanguage).subscribe((language) => {
      if (language === 'ENGLISH' || language === 'en') {
        this.translateService.use('en');
      } else if (language === 'DEUTSCH' || language === 'de') {
        this.translateService.use('de');
      }
      this.initCookieTranslations();
    });

    this.cookieService.init();
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

  ngOnDestroy() {
    this.languageSub.unsubscribe();
    this.cookieTranslateSub.unsubscribe();
  }

  initCookieTranslations() {
    this.cookieTranslateSub?.unsubscribe();
    this.cookieTranslateSub = this.translateService //
      .get([
        'cookie.header',
        'cookie.message',
        'cookie.dismiss',
        'cookie.allow',
        'cookie.deny',
        'cookie.link',
        'cookie.policy',
      ])
      .subscribe((data) => {
        this.ccService.getConfig().content = this.ccService.getConfig().content || {};
        // Override default messages with the translated ones
        this.ccService.getConfig().content.header = data['cookie.header'];
        this.ccService.getConfig().content.message = data['cookie.message'];
        this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
        this.ccService.getConfig().content.allow = data['cookie.allow'];
        this.ccService.getConfig().content.deny = data['cookie.deny'];
        this.ccService.getConfig().content.link = data['cookie.link'];
        this.ccService.getConfig().content.policy = data['cookie.policy'];
        this.ccService.destroy(); // remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }
}
