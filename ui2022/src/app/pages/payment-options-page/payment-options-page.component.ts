import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  PaymentDataDto,
  payPlantBag,
  selectCreatedCartId,
  selectPaymentDone,
} from '../../store/payment.store';
import { selectPlantbagPrice } from '../../store/plantbag.store';

@Component({
  selector: 'app-payment-options-page',
  templateUrl: './payment-options-page.component.html',
  styleUrls: ['./payment-options-page.component.scss'],
})
export class PaymentOptionsPageComponent implements OnInit, OnDestroy {
  payPalConfig: IPayPalConfig;
  cartIdSub: Subscription;

  cartPayed: boolean;
  cartPayedSub: Subscription;

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectPlantbagPrice).subscribe((price) => {
      this.initPaypalConfig(price);
    });
    this.cartIdSub = this.store.select(selectCreatedCartId).subscribe((cartId) => {
      this.paymentData.cartId = cartId;
    });
    this.cartPayedSub = this.store.select(selectPaymentDone).subscribe((cartPayed) => {
      this.cartPayed = cartPayed;
      //TODO: show some success message and/or disable paymentOptions to signalize that the payment is done successfully
    });
  }

  ngOnDestroy(): void {
    this.cartIdSub?.unsubscribe();
  }

  initPaypalConfig(price: number) {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AY7q3cX-S1w60RV7sbCPo27zHabr-COtyAWUGJibBL9hkos4eg25PyskST_uYLXsPxYkBo2guws927Ky',
      style: {
        // layout: 'vertical',
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
                // value: '0.01',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: price + '',
                    // value: '0.01',
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
                    // value: '0.01'
                  },
                },
              ],
            },
          ],
        },

      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data,
        );
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
}
