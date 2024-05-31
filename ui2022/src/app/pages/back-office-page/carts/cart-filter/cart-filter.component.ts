import { Component, OnInit } from '@angular/core';
import {
  loadCarts,
  CartsLoadRequest,
  selectCartsLoadingProgress,
} from '../../../../store/carts.store';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridHelper } from '../../../../util/grid.helper';
import { DateHelper } from 'src/app/util/date.helper';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-cart-filter',
    templateUrl: './cart-filter.component.html',
    styleUrls: ['./cart-filter.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        NgFor,
        MatOption,
        MatDateRangeInput,
        MatStartDate,
        MatEndDate,
        MatDatepickerToggle,
        MatSuffix,
        MatDateRangePicker,
        NgIf,
        MatError,
        MatButton,
        MatProgressBar,
        AsyncPipe,
    ],
})
export class CartFilterComponent implements OnInit {
  cartStatesList = this.gridHelper.getCartStates();

  cartStatesDefault = ['CALLBACK'];

  range = new UntypedFormGroup({
    start: new UntypedFormControl(this.dateHelper.subtractMonths(new Date(), 3)),
    end: new UntypedFormControl(new Date()),
  });

  requestForm: UntypedFormGroup = new UntypedFormGroup({
    cartStates: new UntypedFormControl(),
  });

  cartsLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: UntypedFormBuilder,
    private gridHelper: GridHelper,
    private dateHelper: DateHelper,
  ) {
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
      cartStates: this.requestForm.get('cartStates').value.filter((value) => 1 == 1),
      from: this.range.get('start').value.valueOf(),
      to: this.range.get('end').value.valueOf(),
    };
    this.store.dispatch(loadCarts({ request }));
  }
}
