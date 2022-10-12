import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Action,
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { AppState } from './app.state';
import { AuthService } from '../services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { loadTreeTypes } from './treeType.store';
import { Router } from '@angular/router';
import { addError } from './error.state';
import {
  setUsername,
  loadProfileDetails,
  loadAdminFlag,
} from './profile.store';

export const login = createAction(
  '[Auth] login',
  props<{ name: string; password: string }>()
);
export const loginFailed = createAction(
  '[Auth] Login failed',
  props<{ error: string }>()
);
export const resetPasswordRequest = createAction(
  '[Auth] Reset Password Request',
  props<{ email: string; language: string }>()
);
export const resetPasswordRequestSuccess = createAction(
  '[Auth] Reset Password Request Success'
);
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ id: string; password: string; key: string; language: string }>()
);
export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);
export const verifyPasswordResetLink = createAction(
  '[Auth] Verify Password Reset Link',
  props<{ id: string; key: string; language: string }>()
);
export const verifyPasswordResetLinkFailed = createAction(
  '[Auth] Verify Password Reset Link Failed'
);

export const logout = createAction('[Auth] logout');

export interface AuthState {
  loginError: string;
  passwordResetRequestSent: boolean;
  passwordResetSent: boolean;
  passwordResetLinkVerified: boolean;
}

export const initialState: AuthState = {
  loginError: null,
  passwordResetRequestSent: false,
  passwordResetSent: false,
  passwordResetLinkVerified: true,
};

const authReducer = createReducer(
  initialState,
  on(resetPasswordRequestSuccess, (state) => ({
    ...state,
    passwordResetRequestSent: true,
  })),
  on(resetPasswordSuccess, (state) => ({
    ...state,
    passwordResetSent: true,
  })),
  on(verifyPasswordResetLinkFailed, (state) => ({
    ...state,
    passwordResetLinkVerified: false,
  })),
  on(loginFailed, (state, { error }) => ({
    ...state,
    loginError: error,
  })),
  on(logout, (state) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    return {
      ...state,
      loggedIn: null,
      jwtToken: null,
    };
  })
);

export function authReducerFn(state, action) {
  return authReducer(state, action);
}

export const authFeature = (state: AppState) => state.auth;

export const selectLoginError = createSelector(
  authFeature,
  (state: AuthState) => state.loginError
);

export const selectPasswordResetRequestSent = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetRequestSent
);

export const selectPasswordResetSent = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetSent
);

export const selectVerifyPasswordResetLink = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetLinkVerified
);

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private authService: AuthService,
    private router: Router // we will need this service for API calls
  ) {}

  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action: any) =>
        this.authService.login(action.name, action.password).pipe(
          switchMap((response) => {
            localStorage.setItem('jwt', response.headers.get('X-AUTH-TOKEN'));
            localStorage.setItem(
              'username',
              response.headers.get('X-AUTH-USERNAME')
            );
            this.router.navigate(['/backOffice2022/carts']);
            return [
              // loginSuccess({ jwtToken: response.headers.get('X-AUTH-TOKEN') }),
              setUsername({
                username: response.headers.get('X-AUTH-USERNAME'),
              }),
              loadAdminFlag(),
              loadProfileDetails({
                username: response.headers.get('X-AUTH-USERNAME'),
              }),
              loadTreeTypes(),
            ];
          }),
          catchError(() => [loginFailed({ error: 'login failed' })])
        )
      )
    )
  );

  Logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action: any) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  ResetPasswordRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordRequest),
      switchMap((action: any) =>
        this.authService
          .resetPasswordRequest(action.email, action.language)
          .pipe(switchMap((response) => [resetPasswordRequestSuccess()]),
          catchError((error) => [ addError({
            error: { key: 'USER_NOT_FOUND', message: 'Nutzer nicht gefunden' },
          }),]))
      )
    )
  );

  ResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap((action: any) =>
        this.authService
          .resetPassword(
            action.id,
            action.password,
            action.key,
            action.language
          )
          .pipe(switchMap((response) => [resetPasswordSuccess()]))
      )
    )
  );

  VerifyPasswordResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyPasswordResetLink),
      switchMap((action: any) =>
        this.authService
          .verifyPasswordResetLink(action.id, action.key, action.language)
          .pipe(
            switchMap((response) => []),
            catchError(() => [verifyPasswordResetLinkFailed()])
          )
      )
    )
  );
}
