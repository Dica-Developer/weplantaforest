import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadLastPayedCart, selectLastPayedCart } from 'src/app/store/payment.store';
import { selectPlantbagPrice } from "src/app/store/plantbag.store";

@Component({
  selector: 'app-sepa-page',
  templateUrl: './sepa-page.component.html',
  styleUrls: ['./sepa-page.component.scss'],
})
export class SepaPageComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    cartId: new FormControl(null),
    giftId: new FormControl(null),
    company: new FormControl(''),
    companyAddon: new FormControl(''),

    salutation: new FormControl(''),
    title: new FormControl(''),
    forename: new FormControl(''),
    name: new FormControl(''),

    street: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    mail: new FormControl(''),

    receipt: new FormControl(''),
    comment: new FormControl(''),

    paymentMethod: new FormControl(''),
    transactionId: new FormControl(''),
    iban: new FormControl(''),
    bic: new FormControl(''),

  });

  lastPayedCartSub: Subscription;

  plantBagPrice$ = this.store.select(selectPlantbagPrice);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadLastPayedCart());
    this.store.select(selectLastPayedCart).subscribe((cart) => {
      console.log('last payed:');
      console.log(cart);
      if (cart) {
        this.form.get('company').setValue(cart.callBackFirma);
        this.form.get('salutation').setValue(cart.callBackSalutation);

        this.form.get('country').setValue(cart.callBackLand);
        this.form.get('forename').setValue(cart.callBackVorname);
        this.form.get('name').setValue(cart.callBackNachname);
        this.form.get('street').setValue(cart.callBackStrasse);
        this.form.get('zip').setValue(cart.callBackPlz);
        this.form.get('city').setValue(cart.callBackOrt);
        this.form.get('mail').setValue(cart.callBackEmail);
        this.form.get('title').setValue(cart.callBackTitle);
      }
    });
  }

  ngOnDestroy(): void {
    this.lastPayedCartSub?.unsubscribe();
  }
}
