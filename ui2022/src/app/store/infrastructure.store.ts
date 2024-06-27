import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { AppState } from './app.state';
import { InfrastrutureService } from '../services/infrastructure.service';
import { PlatformHelper } from '../util/helper/platform.helper';
import { CookieHelper } from '../util/helper/cookie.helper';

export interface OfferAreaDTO {
  first: string;
  name: string;
  mail: string;
  comment: string;
}

export interface InfrastrutureState {
  formDisabled: boolean;
  captcha: string;
  captchaImg: any;
  cookies: boolean;
}

export const intialState: InfrastrutureState = {
  formDisabled: false,
  captcha: '',
  captchaImg: null,
  cookies: false,
};

export const submitOfferArea = createAction(
  '[Infra] submit offer area',
  props<{ offer: OfferAreaDTO }>(),
);
export const submitOfferAreaSuccess = createAction(
  '[Infra] submit offer area  success',
  props<{ formDisabled: boolean }>(),
);
export const loadCaptcha = createAction(
  '[Infra] load captcha token',
);
export const loadCaptchaSuccess = createAction(
  '[Infra] load captcha token success',
  props<{ token: string; img: any }>(),
);
export const initCookies = createAction('[Infra] init cookies');
export const acceptCookies = createAction('[Infra] accept cookies');
export const declineCookies = createAction('[Infra] decline cookies');

export const formDisabledFlagReset = createAction('[Infra] reset formDisabled flag');

const infrastructureReducer = createReducer(
  intialState,
  on(acceptCookies, (state) => ({
    ...state,
    cookies: true,
    formDisabled: false,
  })),
  on(declineCookies, (state) => ({
    ...state,
    cookies: false,
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
  on(loadCaptchaSuccess, (state, { token, img }) => ({
    ...state,
    captcha: token,
    captchaImg: img,
  })),
);

export function infrastructureReducerFn(state, action) {
  return infrastructureReducer(state, action);
}

export const infrastructureFeature = (state: AppState) => state.infrastructureState;

export const selectCookies = createSelector(
  infrastructureFeature,
  (state: InfrastrutureState) => state.cookies,
);
export const selectFormDisabled = createSelector(
  infrastructureFeature,
  (state: InfrastrutureState) => state.formDisabled,
);
export const selectCaptcha = createSelector(
  infrastructureFeature,
  (state: InfrastrutureState) => state.captcha,
);
export const selectCaptchaImg = createSelector(
  infrastructureFeature,
  (state: InfrastrutureState) => state.captchaImg,
);

@Injectable()
export class InfrastructureEffects {
  constructor(private actions$: Actions, private platformHelper: PlatformHelper, private infrastructureService: InfrastrutureService) {}

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

  loadCaptcha$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCaptcha),
      switchMap(() =>
        this.infrastructureService.generateCaptcha().pipe(
          switchMap((res) => {
            return [loadCaptchaSuccess({ token: res[0], img: res[1] })];
          }),
        ),
      ),
    ),
  );
}
