import { Injectable } from '@angular/core';
import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { AppState } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { switchMap } from 'rxjs/operators';

export const setUsername = createAction(
  '[Profile] set username',
  props<{ username: string }>()
);
export const loadProfileDetails = createAction(
  '[Profile] load Details',
  props<{ username: string }>()
);
export const loadProfileDetailsSuccess = createAction(
  '[Profile] load Details success',
  props<{ details: any }>()
);
export const loadAdminFlag = createAction('[Profile] load Admin flag');
export const loadAdminFlagSuccess = createAction(
  '[Profile] load Admin flag success',
  props<{ isAdmin: boolean }>()
);

export interface Co2Data {
  treesCount: number;
  co2: number;
}

export interface ProfileDetails {
  id: number;
  aboutMe: string;
  co2Data: Co2Data;
  editAllowed: boolean;
  homepage: string;
  imageFileName: string;
  lang: string;
  lastVisit: number;
  location: string;
  mail: string;
  newsletter: string;
  organisation: string;
  organizationType: string;
  rank: number;
  regDate: number;
  teamName: string;
  userName: string;
}

export interface ProfileState {
  username: string;
  isAdmin: boolean;
  details: ProfileDetails;
}

export const initialState: ProfileState = {
  username: '',
  isAdmin: false,
  details: null,
};

const profileReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username })),
  on(loadProfileDetailsSuccess, (state, { details }) => ({
    ...state,
    details,
  })),
  on(loadAdminFlagSuccess, (state, { isAdmin }) => ({ ...state, isAdmin }))
);

export function profileReducerFn(state, action) {
  return profileReducer(state, action);
}

export const profileFeature = (state: AppState) => state.profileState;

export const selectUsername = createSelector(
  profileFeature,
  (state: ProfileState) => state.username
);

export const selectProfileImagename = createSelector(
  profileFeature,
  (state: ProfileState) => state.details?.imageFileName
);

export const selectProfileDetails = createSelector(
  profileFeature,
  (state: ProfileState) => state.details
);

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  LoadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileDetails),
      switchMap((action) =>
        this.profileService
          .loadUserDetails(action.username)
          .pipe(
            switchMap((details) => [loadProfileDetailsSuccess({ details })])
          )
      )
    )
  );

  IsAdmin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAdminFlag),
        switchMap((action) =>
          this.profileService
            .isAdmin()
            .pipe(
              switchMap((isAdmin: boolean) => [
                loadAdminFlagSuccess({ isAdmin }),
              ])
            )
        )
      ),
  );
}
