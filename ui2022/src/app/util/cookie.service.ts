import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppCookieService {
  private popupCloseSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;

  constructor(
    private ngCookieConsent: NgcCookieConsentService,
    private ngxCookieService: CookieService,
  ) {}

  init() {
    this.popupCloseSubscription = this.ngCookieConsent.popupClose$.subscribe(() => {
      // you can use this.ngCookieConsent.getConfig() to do stuff...
    });

    this.statusChangeSubscription = this.ngCookieConsent.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        console.log(this.ngxCookieService.getAll());
        if (event.status == 'allow') {
          console.log('allow');
          // do stuff when allow
        } else if (event.status == 'deny') {
          console.log('deny');
          this.ngxCookieService.deleteAll('/');
        }
      },
    );

    this.revokeChoiceSubscription = this.ngCookieConsent.revokeChoice$.subscribe(() => {});
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupCloseSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
  }
}
