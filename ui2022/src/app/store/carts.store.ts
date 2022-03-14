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
  username: string,
  price: number,
  createdAt: number
  givenName: string,
  name: string,
  company: string,
  street: string,
  city: string,
  zip: string,
  paymentType: string
}

export const loadCarts = createAction(
  '[Carts] load',
  props<{ request: CartsLoadRequest }>()
);
export const loadCartsSuccess = createAction(
  '[Carts] load success',
  props<{ carts: Cart[] }>()
);

export interface CartsState {
  carts: GridCart[];
  cartsLoading: boolean;
}

export const initialState: CartsState = {
  carts: [],
  cartsLoading: false
};

const cartsReducer = createReducer(
  initialState,
  on(loadCarts, (state) => ({...state, cartsLoading: true})),
  on(loadCartsSuccess, (state, { carts }) => ({
    ...state,
    carts: convertToGridCarts(carts),
    cartsLoading: false
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
  for(let cart of carts) {
    gridCarts.push(convertToGridCart(cart))
  }
  return gridCarts;
}

function convertToGridCart(cart: Cart): GridCart {
  return {
    username: cart.buyer.name,
    price: cart.totalPrice,
    createdAt: cart.timeStamp,
    givenName: cart.callBackVorname,
    name: cart.callBackNachname,
    company: cart.callBackFirma,
    street: cart.callBackStrasse,
    city: cart.callBackOrt,
    zip: cart.callBackPlz,
    paymentType: cart.callBackZahlungsart
  }
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
}
