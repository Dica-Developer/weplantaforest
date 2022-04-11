import { ErrorStateMatcher } from '@angular/material/core';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

export interface AppError {
  key: string;
  message: string;
}

export const addError = createAction(
  '[Error] add',
  props<{ error: AppError }>()
);
export const removeError = createAction(
  '[Error] remove',
  props<{ key: string }>()
);

export interface ErrorState {
  errors: AppError[];
}

export const initialState: ErrorState = {
  errors: [],
};

const errorReducer = createReducer(
  initialState,
  on(addError, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
  })),
  on(removeError, (state, { key }) => ({
    ...state,
    errors: state.errors.filter((el) => el.key != key),
  }))
);

export function errorsReducerFn(state, action) {
  return errorReducer(state, action);
}

export const errorsFeature = (state: AppState) => state.errors;

export const selectErrors = createSelector(
  errorsFeature,
  (state: ErrorState) => state.errors
);
