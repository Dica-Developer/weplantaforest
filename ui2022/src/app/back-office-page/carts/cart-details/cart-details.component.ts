import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { TextHelper } from '../../../util/text.helper';
import {
  resetCartDetails,
  CartDetails,
  selectCartDetails,
} from '../../../store/carts.store';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  cartDetails: CartDetails;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {
    this.store.select(selectCartDetails).subscribe((details) => {
      this.cartDetails = details;
    });
  }

  ngOnInit(): void {}

  closeDetails() {
    this.store.dispatch(resetCartDetails());
  }

  createName(text: string) {
    return this.textHelper.getTextForLanguage(text, 'de');
  }
}
