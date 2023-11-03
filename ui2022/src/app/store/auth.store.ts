import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { loadTreeTypes } from './treeType.store';
import { Router } from '@angular/router';
import { addError } from './error.state';
import {
  setUsername,
  loadProfileDetails,
  loadAdminFlag,
  resetProfileDetails,
} from './profile.store';

export const signup = createAction(
  '[Auth] Signup',
  props<{
    name: string;
    password: string;
    mail: string;
    newsletter: boolean;
    orgType: string;
    language: string;
  }>(),
);
export const signupSuccess = createAction('[Auth] Signup success');
export const signupFailed = createAction('[Auth] Signup failed', props<{ error: string }>());
export const login = createAction('[Auth] login', props<{ name: string; password: string }>());
export const loginSuccess = createAction('[Auth] login success');
export const loginFailed = createAction('[Auth] Login failed', props<{ error: string }>());
export const resetPasswordRequest = createAction(
  '[Auth] Reset Password Request',
  props<{ email: string; language: string }>(),
);
export const resetPasswordRequestSuccess = createAction('[Auth] Reset Password Request Success');
export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ id: string; password: string; key: string; language: string }>(),
);
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success');
export const verifyPasswordResetLink = createAction(
  '[Auth] Verify Password Reset Link',
  props<{ id: string; key: string; language: string }>(),
);
export const verifyPasswordResetLinkFailed = createAction(
  '[Auth] Verify Password Reset Link Failed',
);
export const verifyRegistration = createAction(
  '[Auth] Verify Registration',
  props<{ id: number; key: string; language: string }>(),
);
export const verifyRegistrationSuccess = createAction('[Auth] Verify Registration Success');
export const verifyRegistrationFailed = createAction(
  '[Auth] Verify Registration Failed',
  props<{ error: string }>(),
);
export const signupDoneReset = createAction('[Auth] Reset SignupDone Flag');
export const verificationDoneReset = createAction('[Auth] Reset VerificationDone Flag');

export const logout = createAction('[Auth] logout');

export interface AuthState {
  isAuthenticated: boolean;
  loginError: string;
  signupError: string;
  passwordResetRequestSent: boolean;
  passwordResetSent: boolean;
  passwordResetLinkVerified: boolean;
  signupDone: boolean;
  verificationSuccess: boolean;
  userId: number;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loginError: null,
  signupError: null,
  passwordResetRequestSent: false,
  passwordResetSent: false,
  passwordResetLinkVerified: true,
  signupDone: false,
  verificationSuccess: false,
  userId: null,
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
  on(loginSuccess, (state, {}) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(signupFailed, (state, { error }) => ({
    ...state,
    signupError: error,
  })),
  on(signupSuccess, (state, {}) => ({
    ...state,
    signupDone: true,
  })),
  on(signupDoneReset, (state, {}) => ({
    ...state,
    signupDone: false,
  })),
  on(verifyRegistrationSuccess, (state, {}) => ({
    ...state,
    verificationSuccess: true,
  })),
  on(verifyRegistrationFailed, (state, {}) => ({
    ...state,
    verificationSuccess: false,
  })),
  on(logout, (state) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    return {
      ...state,
      isAuthenticated: false,
    };
  }),
);

export function authReducerFn(state, action) {
  return authReducer(state, action);
}

export const authFeature = (state: AppState) => state.authState;

export const selectLoginError = createSelector(
  authFeature,
  (state: AuthState) => state.signupError,
);

export const selectSignupError = createSelector(
  authFeature,
  (state: AuthState) => state.signupError,
);

export const selectPasswordResetRequestSent = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetRequestSent,
);

export const selectPasswordResetSent = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetSent,
);

export const selectVerifyPasswordResetLink = createSelector(
  authFeature,
  (state: AuthState) => state.passwordResetLinkVerified,
);

export const selectAuthenticated = createSelector(
  authFeature,
  (state: AuthState) => state.isAuthenticated,
);

export const selectUserId = createSelector(authFeature, (state: AuthState) => state.userId);

export const selectVerificationSuccess = createSelector(
  authFeature,
  (state: AuthState) => state.verificationSuccess,
);

export const selectSignupDone = createSelector(authFeature, (state: AuthState) => state.signupDone);

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private authService: AuthService,
    private router: Router, // we will need this service for API calls
  ) {}

  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action: any) =>
        this.authService.login(action.name, action.password).pipe(
          switchMap((response) => {
            localStorage.setItem('jwt', response.headers.get('X-AUTH-TOKEN'));
            localStorage.setItem('username', response.headers.get('X-AUTH-USERNAME'));
            this.router.navigate(['/']);
            return [
              setUsername({
                username: response.headers.get('X-AUTH-USERNAME'),
              }),
              loadAdminFlag(),
              loadProfileDetails({
                username: response.headers.get('X-AUTH-USERNAME'),
              }),
              loadTreeTypes(),
              loginSuccess(),
            ];
          }),
          catchError(() => {
            return [
              loginFailed({ error: 'login failed' }),
              addError({ error: { key: 'Error', message: 'login failed' } }),
            ];
          }),
        ),
      ),
    ),
  );

  verifyRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyRegistration),
      switchMap((action: any) =>
        this.authService.verifyRegistration(action.id, action.key, action.language).pipe(
          switchMap((response) => {
            return [verifyRegistrationSuccess()];
          }),
          catchError(() => [verifyRegistrationFailed({ error: 'verification failed' })]),
        ),
      ),
    ),
  );

  Signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap((action: any) =>
        this.authService
          .signup(
            action.name,
            action.password,
            action.mail,
            action.newsletter,
            action.orgType,
            action.language,
          )
          .pipe(
            switchMap((response) => {
              return [signupSuccess()];
            }),
            catchError((err) => [
              signupFailed({ error: 'signup failed' }),
              addError({
                error: { key: 'Error', message: err.error.errorInfos[0]?.errorCode },
              }),
            ]),
          ),
      ),
    ),
  );

  Logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap((action: any) => {
          resetProfileDetails();
          this.router.navigate(['/']);
          localStorage.removeItem('jwt');
        }),
      ),
    { dispatch: false },
  );

  ResetPasswordRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPasswordRequest),
      switchMap((action: any) =>
        this.authService.resetPasswordRequest(action.email, action.language).pipe(
          switchMap((response) => [resetPasswordRequestSuccess()]),
          catchError((error) => [
            addError({
              error: { key: 'USER_NOT_FOUND', message: 'Nutzer nicht gefunden' },
            }),
          ]),
        ),
      ),
    ),
  );

  ResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap((action: any) =>
        this.authService
          .resetPassword(action.id, action.password, action.key, action.language)
          .pipe(switchMap((response) => [resetPasswordSuccess()])),
      ),
    ),
  );

  VerifyPasswordResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyPasswordResetLink),
      switchMap((action: any) =>
        this.authService.verifyPasswordResetLink(action.id, action.key, action.language).pipe(
          switchMap((response) => []),
          catchError(() => [verifyPasswordResetLinkFailed()]),
        ),
      ),
    ),
  );
}
