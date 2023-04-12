import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { PaymentService } from '../services/payment.service';
import { AppState } from './app.state';
import { Cart } from './carts.store';
import { addSuccessMessage } from './success-message.state';

export interface PaymentDataDto {
  cartId: number;
  giftId: number;
  company: string;
  companyAddon: string;

  salutation: string;
  title: string;
  forename: string;
  name: string;

  street: string;
  country: string;
  city: string;
  zip: string;
  mail: string;

  receipt: string;
  comment: string;

  paymentMethod: string;
  transactionId: string;
  iban: string;
  bic: string;
}

export const payPlantBag = createAction(
  '[Payment] pay plantbag',
  props<{ requestDto: PaymentDataDto }>(),
);
export const payPlantBagSucess = createAction('[Payment] pay plantbag success');

export const loadLastPayedCart = createAction('[Payment] load last cart');

export const loadLastPayedCartSuccess = createAction(
  '[Payment] load last cart success',
  props<{ cart: Cart }>(),
);

export const createCartFromPlantBag = createAction(
  '[Payment] create cart from plantbag',
  props<{ plantBag: any }>(),
);
export const createCartFromPlantBagSuccess = createAction(
  '[Payment] create cart from plantbag success',
  props<{ cartId: number }>(),
);

export const resetCreatedCartId = createAction('[Payment] reset createdCartId and cartPayed');

export interface PaymentState {
  data: PaymentDataDto | null;
  loading: boolean;
  cartCreated: boolean;
  createdCartId: number;
  cartPayed: boolean;
  lastPayedCart: Cart;
}

export const initialState: PaymentState = {
  data: null,
  loading: false,
  cartPayed: false,
  cartCreated: false,
  createdCartId: -1,
  lastPayedCart: null,
};

export const paymentReducer = createReducer(
  initialState,
  on(payPlantBag, (state, action) => ({
    ...state,
    data: action.requestDto,
    loading: true,
    done: false,
  })),
  on(payPlantBagSucess, (state, action) => ({
    ...state,
    loading: false,
    cartPayed: true,
  })),
  on(createCartFromPlantBagSuccess, (state, action) => ({
    ...state,
    cartCreated: true,
    createdCartId: action.cartId,
  })),
  on(loadLastPayedCartSuccess, (state, action) => ({
    ...state,
    lastPayedCart: action.cart,
  })),
  on(resetCreatedCartId, (state) => ({
    ...state,
    cartCreated: false,
    createdCartId: null,
  })),
);

export function paymentReducerFn(state, action) {
  return paymentReducer(state, action);
}

export const paymentFeature = (state: AppState) => state.paymentState;

export const selectCartForPaymentCreated = createSelector(
  paymentFeature,
  (state: PaymentState) => state.cartCreated,
);

export const selectLastPayedCart = createSelector(
  paymentFeature,
  (state: PaymentState) => state.lastPayedCart,
);

export const selectPaymentDone = createSelector(
  paymentFeature,
  (state: PaymentState) => state.cartPayed,
);

export const selectCreatedCartId = createSelector(
  paymentFeature,
  (state: PaymentState) => state.createdCartId,
);

@Injectable()
export class PaymentEffects {
  constructor(private actions$: Actions, private paymentService: PaymentService) {}

  createCartFromPlantBag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCartFromPlantBag),
      switchMap((action) =>
        this.paymentService
          .convertPlantBagToCart(action.plantBag)
          .pipe(switchMap((cartId) => [createCartFromPlantBagSuccess({ cartId })])),
      ),
    ),
  );

  loadLastPayedCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLastPayedCart),
      switchMap(() =>
        this.paymentService
          .loadLastPayedCart()
          .pipe(switchMap((cart) => [loadLastPayedCartSuccess({ cart })])),
      ),
    ),
  );

  payPlantBag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(payPlantBag),
      switchMap((action) =>
        this.paymentService.payCart(action.requestDto).pipe(
          switchMap(() => [
            payPlantBagSucess(),
            addSuccessMessage({
              message: { key: 'PLANTBAG_PAYED_SUCCES', message: 'Pflanzkorb bezahlt!' },
            }),
          ]),
        ),
      ),
    ),
  );
}
