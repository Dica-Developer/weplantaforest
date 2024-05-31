import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { TextHelper } from '../../../../util/text.helper';
import { resetCartDetails, CartDetails, selectCartDetails } from '../../../../store/carts.store';
import { NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgFor,
        CurrencyPipe,
        DatePipe,
    ],
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  cartDetails: CartDetails;

  cartDetailsSub = this.store.select(selectCartDetails).subscribe((details) => {
    this.cartDetails = details;
  });

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.cartDetailsSub.unsubscribe();
  }

  closeDetails() {
    this.store.dispatch(resetCartDetails());
  }

  createName(text: string) {
    return this.textHelper.getTextForLanguage(text, 'de');
  }
}
