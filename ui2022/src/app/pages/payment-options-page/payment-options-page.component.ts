import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { AppState } from 'src/app/store/app.state';
import { selectPlantbagPrice } from 'src/app/store/plantbag.store';

@Component({
  selector: 'app-payment-options-page',
  templateUrl: './payment-options-page.component.html',
  styleUrls: ['./payment-options-page.component.scss'],
})
export class PaymentOptionsPageComponent implements OnInit {
  payPalConfig: IPayPalConfig;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectPlantbagPrice).subscribe((price) => {
      this.initPaypalConfig(price);
    });
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
                // value: price + '',
                value: '0.01',
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    // value: price + '',
                    value: '0.01'
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
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data,
        );
        // const paymentData
        //TODO: add payedViaPAypal action dispatch here...
      },
    };
  }
}
