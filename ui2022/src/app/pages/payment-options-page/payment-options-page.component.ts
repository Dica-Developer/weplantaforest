import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  PaymentDataDto,
  payPlantBag,
  resetCartPayed,
  selectCreatedCartId,
  selectCreatedGiftId,
  selectPaymentDone,
} from '../../store/payment.store';
import { selectPlantbagPrice } from '../../store/plantbag.store';
import { selectCookies } from 'src/app/store/infrastructure.store';
import { selectAuthenticated } from 'src/app/store/auth.store';
import { CookieHelper } from 'src/app/util/helper/cookie.helper';
import { TranslateModule } from '@ngx-translate/core';
import { NotAuthenticatedWarningComponent } from '../../util/common-components/not-authenticated-warning/not-authenticated-warning.component';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-payment-options-page',
  templateUrl: './payment-options-page.component.html',
  styleUrls: ['./payment-options-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgxPayPalModule,
    CommonModule,
    ButtonComponent,
    NotAuthenticatedWarningComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class PaymentOptionsPageComponent implements OnInit, OnDestroy {
  payPalConfig: IPayPalConfig;
  cartIdSub: Subscription;
  cartPayed: boolean;
  cartPayedSub: Subscription;
  giftSub: Subscription;

  paymentData: PaymentDataDto = {
    cartId: null,
    giftId: null,
    company: '',
    companyAddon: '',
    salutation: '',
    title: '',
    forename: '',
    name: '',
    street: '',
    country: '',
    city: '',
    zip: '',
    mail: '',
    receipt: '',
    comment: '',
    paymentMethod: 'PP',
    transactionId: '',
    iban: '',
    bic: '',
  };

  loggedIn$ = this.store.select(selectAuthenticated);
  cookiesAccepted$: Observable<boolean> = this.store.select(selectCookies);
  plantbagPrice$: Observable<number> = this.store.select(selectPlantbagPrice);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cookieHelper: CookieHelper,
    private platformHelper: PlatformHelper
  ) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.store.select(selectPlantbagPrice).subscribe((price) => {
      this.initPaypalConfig(price);
    });
    this.cartIdSub = this.store.select(selectCreatedCartId).subscribe((cartId) => {
      this.paymentData.cartId = cartId;
    });

    this.cartPayedSub = this.store.select(selectPaymentDone).subscribe((cartPayed) => {
      this.cartPayed = cartPayed;
      if (this.cartPayed) {
        if (this.platformHelper.getLocalstorage('username')) {
          this.router.navigate(['/user/' + this.platformHelper.getLocalstorage('username')]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
    this.giftSub = this.store.select(selectCreatedGiftId).subscribe((giftId) => {
      this.paymentData.giftId = giftId;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCartPayed());
    this.cartPayedSub?.unsubscribe();
    this.cartIdSub?.unsubscribe();
    this.giftSub?.unsubscribe();
  }

  initPaypalConfig(price: number) {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AY7q3cX-S1w60RV7sbCPo27zHabr-COtyAWUGJibBL9hkos4eg25PyskST_uYLXsPxYkBo2guws927Ky',
      style: {
        label: 'pay',
        shape: 'pill', // pill | rect
        color: 'black', // gold | blue | silver | black
        tagline: false,
        fundingicons: true, // optional
      },
      fundingSource: 'PAYPAL',

      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: price + '',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: price + '',
                  },
                },
              },
              items: [
                {
                  name: 'Spende an Wald 1.1 GmbH',
                  quantity: '1',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: price + '',
                  },
                },
              ],
            },
          ],
        },

      onClientAuthorization: (data) => {
        //TODO: check paypal response for company name --> doesnt seem like there is one according to IPaypalConfig interface
        this.paymentData.mail = data.payer.email_address;
        this.paymentData.forename = data.payer.name?.given_name;
        this.paymentData.name = data.payer.name?.surname;
        this.paymentData.street = data.purchase_units[0]?.shipping?.address?.address_line_1;
        this.paymentData.city = data.purchase_units[0]?.shipping?.address?.admin_area_2;
        this.paymentData.zip = data.purchase_units[0]?.shipping?.address?.postal_code;
        this.paymentData.country = data.purchase_units[0]?.shipping?.address?.country_code;
        this.paymentData.transactionId = data.id;
        this.store.dispatch(payPlantBag({ requestDto: this.paymentData }));
      },
    };
  }

  showCookieConfirmation() {
    this.cookieHelper.openCookieConfirmation();
  }
}
