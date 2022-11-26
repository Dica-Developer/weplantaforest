import { Component, OnInit } from '@angular/core';
import { loadCarts, CartsLoadRequest, selectCartsLoadingProgress } from '../../../store/carts.store';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridHelper } from '../../../util/grid.helper';

@Component({
  selector: 'app-cart-filter',
  templateUrl: './cart-filter.component.html',
  styleUrls: ['./cart-filter.component.scss'],
})
export class CartFilterComponent implements OnInit {

  cartStatesList = this.gridHelper.getCartStates();

  cartStatesDefault = ['CALLBACK'];

  range = new UntypedFormGroup({
    start: new UntypedFormControl(moment().subtract(3, 'months').toDate()),
    end: new UntypedFormControl(new Date()),
  });

  requestForm: UntypedFormGroup = new UntypedFormGroup({
    cartStates: new UntypedFormControl(),
  });

  cartsLoading$: Observable<boolean>;


  constructor(private store: Store<AppState>, private fb: UntypedFormBuilder, private gridHelper: GridHelper) {
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
