import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { catchError, switchMap } from 'rxjs';
import { PaymentService } from '../services/payment.service';
import { AppState } from './app.state';
import { Cart } from './carts.store';
import { addError } from './error.state';
import { resetPlantbag } from './plantbag.store';
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

export const createGiftFromPlantBag = createAction(
  '[Payment] create gift from plantbag',
  props<{ plantBag: any }>(),
);

export const createGiftFromPlantBagSuccess = createAction(
  '[Payment] create gift from plantbag success',
  props<{ cartId: number; giftId: number }>(),
);

export const resetCreatedCartId = createAction('[Payment] reset createdCartId and cartPayed');

export const resetCreatedGiftId = createAction('[Payment] reset createdGiftId and cartPayed');

export const setGift = createAction('[Payment] set gift', props<{ isGift: boolean }>());

export const resetCartPayed = createAction('[Payment] reset cartPayed');

export interface PaymentState {
  data: PaymentDataDto | null;
  loading: boolean;
  cartCreated: boolean;
  createdCartId: number;
  cartPayed: boolean;
  lastPayedCart: Cart;
  isGift: boolean;
  createdGiftId: number;
}

export const initialState: PaymentState = {
  data: null,
  loading: false,
  cartPayed: false,
  cartCreated: false,
  createdCartId: -1,
  lastPayedCart: null,
  isGift: false,
  createdGiftId: -1,
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
  on(resetCreatedGiftId, (state) => ({
    ...state,
    createdGiftId: null,
    cartCreated: false,
  })),
  on(setGift, (state, action) => ({
    ...state,
    isGift: action.isGift,
  })),
  on(createGiftFromPlantBagSuccess, (state, action) => ({
    ...state,
    createdGiftId: action.giftId,
    createdCartId: action.cartId,
    cartCreated: true,
  })),
  on(resetCartPayed, (state) => ({
    ...state,
    cartPayed: false,
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

export const selectIsGift = createSelector(paymentFeature, (state: PaymentState) => state.isGift);

export const selectCreatedGiftId = createSelector(
  paymentFeature,
  (state: PaymentState) => state.createdGiftId,
);

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private translateService: TranslateService,
  ) {}

  createCartFromPlantBag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCartFromPlantBag),
      switchMap((action) =>
        this.paymentService
          .convertPlantBagToCart(action.plantBag)
          .pipe(switchMap((cartId) => [createCartFromPlantBagSuccess({ cartId })])),
      ),
      catchError((err) => {
        return [
          addError({
            error: { key: 'payment_error', message: err.error.errorInfos[0]?.errorCode },
          }),
        ];
      }),
    ),
  );

  createGiftFromPlantBag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGiftFromPlantBag),
      switchMap((action) =>
        this.paymentService
          .convertPlantBagToGift(action.plantBag)
          .pipe(
            switchMap(([cartId, giftId]) => [createGiftFromPlantBagSuccess({ cartId, giftId })]),
          ),
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
          switchMap(() => {
            return [
              payPlantBagSucess(),
              addSuccessMessage({
                message: { key: 'PLANTBAG_PAYED_SUCCES', message: 'Pflanzkorb bezahlt!' },
              }),
              resetPlantbag(),
            ];
          }),
          catchError((err) => {
            return [
              addError({
                error: { key: 'payment_error', message: err.error.errorInfos[0]?.errorCode },
              }),
            ];
          }),
        ),
      ),
    ),
  );
}
