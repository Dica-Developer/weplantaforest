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
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadTreeTypes } from './treeType.store';
import {
  setUsername,
  loadProfileDetails,
  loadAdminFlag,
} from './profile.store';

export const login = createAction(
  '[Auth] login',
  props<{ name: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ jwtToken: string }>()
);
export const loginFailed = createAction(
  '[Auth] Login failed',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] logout');

export interface AuthState {
  loggedIn: boolean;
  jwtToken: string;
  loginError: string;
}

export const initialState: AuthState = {
  loggedIn: false,
  jwtToken: null,
  loginError: null,
};

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { jwtToken }) => ({
    ...state,
    loggedIn: true,
    jwtToken: jwtToken,
  })),
  on(loginFailed, (state, { error }) => ({
    ...state,
    loginError: error,
  })),
  on(logout, (state) => ({
    ...state,
    loggedIn: null,
    jwtToken: null,
  }))
);

export function authReducerFn(state, action) {
  return authReducer(state, action);
}

export const authFeature = (state: AppState) => state.auth;

export const selectLoggedIn = createSelector(
  authFeature,
  (state: AuthState) => state.loggedIn
);

export const selectLoginError = createSelector(
  authFeature,
  (state: AuthState) => state.loginError
);

export const selectJwtToken = createSelector(
  authFeature,
  (state: AuthState) => state.jwtToken
);

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private authService: AuthService // we will need this service for API calls
  ) {}

  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action: any) =>
        this.authService.login(action.name, action.password).pipe(
          switchMap((response) => [
            loginSuccess({ jwtToken: response.headers.get('X-AUTH-TOKEN') }),
            setUsername({ username: response.headers.get('X-AUTH-USERNAME') }),
            loadAdminFlag(),
            loadProfileDetails({
              username: response.headers.get('X-AUTH-USERNAME'),
            }),
            loadTreeTypes()
          ]),
          catchError(() => [loginFailed({ error: 'login failed' })])
        )
      )
    )
  );
}
