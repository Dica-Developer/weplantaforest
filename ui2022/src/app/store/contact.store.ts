import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ContactService } from '../services/contact.service';

export interface ContactRequest {
  reason: string;
  name: string;
  mail: string;
  phone: string;
  message: string;
}

export interface ContactState {
  isLoading: boolean;
}

export const initialState: ContactState = {
  isLoading: false,
};

// actions ACTIONS actions ACTIONS actions

export const submitContactRequestAction = createAction(
  '[Contact] submit contact request',
  props<{ request: ContactRequest }>(),
);
export const submitContactRequestSuccess = createAction('[Contact] submit contact request success');

// reducer REDUCER reducer REDUCER reducer
const contactReducer = createReducer(
  initialState,
  on(submitContactRequestAction, (state) => ({ ...state, isLoading: true })),
  on(submitContactRequestSuccess, (state) => ({ ...state, isLoading: false })),
);

export function contactReducerFn(state, action) {
  return contactReducer(state, action);
}

// selectors SELECTORS selectors SELECTORS selectors
//   export const cartsFeature = (state: AppState) => state.cartsState;
//   export const selectCarts = createSelector(cartsFeature, (state: CartsState) => state.carts);
//   export const selectCartsLoadingProgress = createSelector(
//     cartsFeature,
//     (state: CartsState) => state.cartsLoading,
//   );

//   export const selectCartDetails = createSelector(
//     cartsFeature,
//     (state: CartsState) => state.cartDetails,
//   );

// effects EFFECTS effects EFFECTS effects
@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService) {}

  SubmitContactRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitContactRequestAction),
      switchMap((action: any) =>
        this.contactService
          .submitContactRequest(action.request)
          .pipe(switchMap(() => [submitContactRequestSuccess()])),
      ),
    ),
  );
}
