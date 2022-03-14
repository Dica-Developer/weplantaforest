import { Component, OnInit } from '@angular/core';
import { loadCarts, CartsLoadRequest, selectCartsLoadingProgress } from '../../../store/carts.store';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-filter',
  templateUrl: './cart-filter.component.html',
  styleUrls: ['./cart-filter.component.scss'],
})
export class CartFilterComponent implements OnInit {

  cartStatesList = [
    { value: 'CALLBACK', label: 'Callback' },
    { value: 'INITIAL', label: 'Initial' },
    { value: 'VERIFIED', label: 'Verified' },
    { value: 'GENERATED', label: 'Generated' },
    { value: 'DISCARED', label: 'Discarded' },
  ];

  cartStatesDefault = ['CALLBACK'];

  range = new FormGroup({
    start: new FormControl(moment().subtract(3, 'months').toDate()),
    end: new FormControl(new Date()),
  });

  requestForm: FormGroup = new FormGroup({
    cartStates: new FormControl(),
  });

  cartsLoading$: Observable<boolean>;


  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.requestForm = fb.group({
      cartStates: [this.cartStatesDefault],
    });
    this.cartsLoading$ = this.store.select(selectCartsLoadingProgress);
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    const request: CartsLoadRequest = {
      cartStates: this.requestForm
        .get('cartStates')
        .value.filter((value) => 1 == 1),
      from: this.range.get('start').value.valueOf(),
      to: this.range.get('end').value.valueOf(),
    };
    this.store.dispatch(loadCarts({ request }));
  }
}
