import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  loadLastPayedCart,
  payPlantBag,
  resetCartPayed,
  selectCreatedCartId,
  selectCreatedGiftId,
  selectLastPayedCart,
  selectPaymentDone,
} from '../../store/payment.store';
import { selectPlantbagPrice } from '../../store/plantbag.store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../util/common-components/button/button.component';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-sepa-page',
    templateUrl: './sepa-page.component.html',
    styleUrls: ['./sepa-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        MatInput,
        MatSelect,
        NgFor,
        MatOption,
        NgIf,
        ButtonComponent,
        AsyncPipe,
        CurrencyPipe,
        TranslateModule,
    ],
})
export class SepaPageComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    cartId: new FormControl(null),
    giftId: new FormControl(null),
    company: new FormControl(''),
    companyAddon: new FormControl(''),

    salutation: new FormControl(1),
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

    paymentMethod: new FormControl('SEPA'),
    transactionId: new FormControl(''),
    iban: new FormControl(''),
    bic: new FormControl(''),
  });

  lastPayedCartSub: Subscription;

  plantBagPrice$ = this.store.select(selectPlantbagPrice);

  cartPayed: boolean;
  cartPayedSub: Subscription;

  cartIdSub: Subscription;
  giftIdSub: Subscription;

  salutations = [
    { value: 1, label: 'mr' },
    { value: 2, label: 'mrs' },
  ];

  default = 1;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadLastPayedCart());
    this.lastPayedCartSub = this.store.select(selectLastPayedCart).subscribe((cart) => {
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

    this.cartPayedSub = this.store.select(selectPaymentDone).subscribe((cartPayed) => {
      this.cartPayed = cartPayed;
      if (this.cartPayed) {
        this.form.disable();
        if (localStorage.getItem('username')) {
          this.router.navigate(['/user/' + localStorage.getItem('username')]);
        } else {
          this.router.navigate(['/']);
        }
      }
    });

    this.cartIdSub = this.store.select(selectCreatedCartId).subscribe((cartId) => {
      this.form.get('cartId').setValue(cartId);
    });

    this.giftIdSub = this.store.select(selectCreatedGiftId).subscribe((giftId) => {
      this.form.get('giftId').setValue(giftId);
    });
  }

  compareValues(object1: any, object2: any) {
    return object1 && object2 && object1.value == object2.value;
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCartPayed());
    this.lastPayedCartSub?.unsubscribe();
    this.cartPayedSub?.unsubscribe();
    this.cartIdSub?.unsubscribe();
    this.giftIdSub?.unsubscribe();
  }

  payPlantbag() {
    if (this.form.valid) {
      const requestDto = this.form.value;
      this.store.dispatch(payPlantBag({ requestDto }));
    }
  }
}
