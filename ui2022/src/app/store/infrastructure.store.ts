import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AppState, PagedData } from './app.state';
import { InfrastrutureService } from '../services/infrastructure.service';

export interface OfferAreaDTO {
  first: string;
  name: string;
  mail: string;
  comment: string;
}

export interface InfrastrutureState {
  formDisabled: boolean;
}

export const intialState: InfrastrutureState = {
  formDisabled: false,
};

export const submitOfferArea = createAction(
  '[Infra] submit offer area',
  props<{ offer: OfferAreaDTO }>(),
);
export const submitOfferAreaSuccess = createAction(
  '[Infra] submit offer area  success',
  props<{ formDisabled: boolean }>(),
);

export const formDisabledFlagReset = createAction('[Infra] reset formDisabled flag');

const infrastructureReducer = createReducer(
  intialState,
  on(submitOfferArea, (state) => ({
    ...state,
    formDisabled: false,
  })),
  on(submitOfferAreaSuccess, (state) => ({
    ...state,
    formDisabled: true,
  })),
  on(formDisabledFlagReset, (state) => ({
    ...state,
    formDisabled: false,
  })),
);

export function infrastructureReducerFn(state, action) {
  return infrastructureReducer(state, action);
}

export const infrastructureFeature = (state: AppState) => state.infrastructureState;

export const selectFormDisabled = createSelector(
  infrastructureFeature,
  (state: InfrastrutureState) => state.formDisabled,
);

@Injectable()
export class InfrastructureEffects {
  constructor(private actions$: Actions, private infrastructureService: InfrastrutureService) {}

  submitOfferArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitOfferArea),
      switchMap((action) =>
        this.infrastructureService.submitOfferArea(action.offer).pipe(
          switchMap(() => {
            return [submitOfferAreaSuccess({ formDisabled: true })];
          }),
        ),
      ),
    ),
  );
}
