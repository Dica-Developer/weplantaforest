import { state } from '@angular/animations';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

export interface CartsLoadRequest {
  cartStates: string[];
  from: number;
  to: number;
}

export interface CartBuyer {
  id: number;
  name: string;
}

export interface Receipt {
  receiptId: number;
}

export interface Cart {
  buyer: CartBuyer;
  callBackFirma: string;
  callBackNachname: string;
  callBackOrt: string;
  callBackPlz: string;
  callBackStrasse: string;
  callBackVorname: string;
  callBackZahlungsart: string;
  cartState: string;
  id: number;
  receipt: Receipt;
  receiptSent: boolean;
  receiptable: boolean;
  timeStamp: number;
  totalPrice: number;
  treeCount: number;
}

export interface GridCart {
  id: number;
  username: string;
  userId: number;
  price: number;
  createdAt: number;
  firstName: string;
  lastName: string;
  company: string;
  street: string;
  city: string;
  postalcode: string;
  paymentType: string;
  receiptable: boolean;
  receiptId: number;
  status: string;
}

export const loadCarts = createAction(
  '[Carts] load',
  props<{ request: CartsLoadRequest }>()
);
export const loadCartsSuccess = createAction(
  '[Carts] load success',
  props<{ carts: Cart[] }>()
);

export const updateAddress = createAction(
  '[Carts] update address',
  props<{ cartId: number; field: string; value: string }>()
);
export const updateAddressSuccess = createAction(
  '[Carts] update address success',
  props<{ cartId: number; field: string; value: string }>()
);

export const updateReceiptableFlag = createAction(
  '[Carts] update receiptable flag',
  props<{ cartId: number; value: boolean }>()
);

export const updateReceiptableFlagSuccess = createAction(
  '[Carts] update receiptable flag success',
  props<{ cartId: number; value: boolean }>()
);

export const updateStatus = createAction(
  '[Carts] update status',
  props<{ cartId: number; value: string }>()
);

export const updateStatusSuccess = createAction(
  '[Carts] update status success',
  props<{ cartId: number; value: string }>()
);

export const createAndSendReceipt = createAction(
  '[Carts] create and send receipt',
  props<{ cartId: number; userId: number }>()
);

export const createAndSendReceiptSuccess = createAction(
  '[Carts] create and send receipt success',
  props<{ receiptId: number; cartId: number }>()
);

export const downloadReceiptPdf = createAction(
  '[Carts] download receipt PDF',
  props<{ receiptId: number }>()
);

export interface CartsState {
  carts: GridCart[];
  cartsLoading: boolean;
}

export const initialState: CartsState = {
  carts: [],
  cartsLoading: false,
};

const cartsReducer = createReducer(
  initialState,
  on(loadCarts, (state) => ({ ...state, cartsLoading: true })),
  on(loadCartsSuccess, (state, { carts }) => ({
    ...state,
    carts: convertToGridCarts(carts),
    cartsLoading: false,
  })),
  on(updateAddressSuccess, (state, { cartId, field, value }) => ({
    ...state,
    carts: state.carts
      .map((cart) => ({ ...cart }))
      .map((cart) => {
        if (cart.id === cartId) {
          return {
            ...cart,
            [field]: value,
          };
        } else {
          return cart;
        }
      }),
  })),
  on(updateReceiptableFlagSuccess, (state, { cartId, value }) => ({
    ...state,
    carts: state.carts
      .map((cart) => ({ ...cart }))
      .map((cart) => {
        if (cart.id === cartId) {
          return {
            ...cart,
            receiptable: value,
          };
        } else {
          return cart;
        }
      }),
  })),
  on(updateStatusSuccess, (state, { cartId, value }) => ({
    ...state,
    carts: state.carts
      .map((cart) => ({ ...cart }))
      .map((cart) => {
        if (cart.id === cartId) {
          return {
            ...cart,
            status: value,
          };
        } else {
          return cart;
        }
      }),
  })),
  on(createAndSendReceiptSuccess, (state, { receiptId, cartId }) => ({
    ...state,
    carts: state.carts
      .map((cart) => ({ ...cart }))
      .map((cart) => {
        if (cart.id === cartId) {
          return {
            ...cart,
            receiptId,
          };
        } else {
          return cart;
        }
      }),
  }))
);

export function cartsReducerFn(state, action) {
  return cartsReducer(state, action);
}

export const cartsFeature = (state: AppState) => state.carts;
export const selectCarts = createSelector(
  cartsFeature,
  (state: CartsState) => state.carts
);
export const selectCartsLoadingProgress = createSelector(
  cartsFeature,
  (state: CartsState) => state.cartsLoading
);

function convertToGridCarts(carts: Cart[]): GridCart[] {
  const gridCarts: GridCart[] = [];
  for (let cart of carts) {
    gridCarts.push(convertToGridCart(cart));
  }
  return gridCarts;
}

function convertToGridCart(cart: Cart): GridCart {
  return {
    id: cart.id,
    username: cart.buyer.name,
    userId: cart.buyer.id,
    price: cart.totalPrice,
    createdAt: cart.timeStamp,
    firstName: cart.callBackVorname,
    lastName: cart.callBackNachname,
    company: cart.callBackFirma,
    street: cart.callBackStrasse,
    city: cart.callBackOrt,
    postalcode: cart.callBackPlz,
    paymentType: cart.callBackZahlungsart,
    receiptable: cart.receiptable,
    receiptId: cart.receipt?.receiptId,
    status: cart.cartState,
  };
}

@Injectable()
export class CartsEffects {
  constructor(private actions$: Actions, private cartsService: CartService) {}

  LoadCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCarts),
      switchMap((action) =>
        this.cartsService
          .loadCarts(action.request)
          .pipe(switchMap((carts: Cart[]) => [loadCartsSuccess({ carts })]))
      )
    )
  );

  UpdateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAddress),
      switchMap((action) =>
        this.cartsService
          .saveAddress(action.cartId, action.field, action.value)
          .pipe(switchMap(() => [updateAddressSuccess(action)]))
      )
    )
  );

  UpdateReceiptableFlag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateReceiptableFlag),
      switchMap((action) =>
        this.cartsService
          .changeReceiptableFlag(action.cartId, action.value)
          .pipe(switchMap(() => [updateReceiptableFlagSuccess(action)]))
      )
    )
  );

  UpdateCartState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStatus),
      switchMap((action) =>
        this.cartsService
          .updateStatus(action.cartId, action.value)
          .pipe(switchMap(() => [updateStatusSuccess(action)]))
      )
    )
  );

  CreateAndSendReceipt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAndSendReceipt),
      switchMap((action) =>
        this.cartsService
          .createAndSendReceipt(action.userId, action.cartId)
          .pipe(
            switchMap((receiptId: number) => [
              createAndSendReceiptSuccess({ receiptId, cartId: action.cartId }),
            ])
          )
      )
    )
  );

//   DownloadReceiptPdf$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(downloadReceiptPdf),
//     switchMap((action) =>
//       this.cartsService
//         .generateReceiptPdf(action.receiptId)
//         // .pipe(
//         //   // switchMap(() => [
//         //   //   // createAndSendReceiptSuccess({ receiptId, cartId: action.cartId }),
//         //   // ])
//         // )
//     )
//   ),
//   {dispatch: false}
// );
}
