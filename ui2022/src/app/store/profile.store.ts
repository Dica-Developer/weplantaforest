import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { loadTeamDetails } from './team.store';

export const setUsername = createAction('[Profile] set username', props<{ username: string }>());
export const loadProfileDetails = createAction(
  '[Profile] load Details',
  props<{ username: string }>(),
);
export const loadProfileDetailsSuccess = createAction(
  '[Profile] load Details success',
  props<{ details: any }>(),
);
export const loadAdminFlag = createAction('[Profile] load Admin flag');
export const loadAdminFlagSuccess = createAction(
  '[Profile] load Admin flag success',
  props<{ isAdmin: boolean }>(),
);

export const loadTreesByUser = createAction(
  '[Profile] load trees by user',
  props<{ username: string; page: number; size: number }>(),
);
export const loadTreesByUserSuccess = createAction(
  '[Profile] load trees by user success',
  props<{ trees: PagedData<ProfileTree> }>(),
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
  profileImageUrl: string;
  lang: string;
  lastVisit: number;
  location: string;
  mail: string;
  newsletter: string;
  organisation: string;
  organizationType: string;
  rank: number;
  regDate: Date;
  teamName: string;
  userName: string;
  trees: PagedData<ProfileTree>;
}

export interface ProfileState {
  username: string;
  isAdmin: boolean;
  details: ProfileDetails;
}

export interface ProfileTree {
  id: number;
  amount: number;
  imagePath: string;
  longitude: number;
  latitude: number;
  submittedOn: Date;
  plantedOn: Date;
  projectName: string;
  treeTypeName: string;
  treeTypeImageUrl: string;
}

export const initialState: ProfileState = {
  username: '',
  isAdmin: false,
  details: null,
};
// http://localhost:8081/user/image/Gabor.png/150/150
const profileReducer = createReducer(
  initialState,
  on(setUsername, (state, { username }) => ({ ...state, username })),
  on(loadProfileDetailsSuccess, (state, { details }) => ({
    ...state,
    details: {
      ...details,
      profileImageUrl: `${environment.backendUrl}/user/image/${details.imageFileName}/150/150`,
      regDate: new Date(details.regDate),
      co2Data: {
        ...details.co2Data,
        co2: Number.parseFloat(details.co2Data.co2).toFixed(2),
      },
    },
  })),
  on(loadAdminFlagSuccess, (state, { isAdmin }) => ({ ...state, isAdmin })),
  on(loadTreesByUserSuccess, (state, { trees }) => ({
    ...state,
    details: {
      ...state.details,
      trees,
    },
  })),
);

export function profileReducerFn(state, action) {
  return profileReducer(state, action);
}

export const profileFeature = (state: AppState) => state.profileState;

export const selectUsername = createSelector(
  profileFeature,
  (state: ProfileState) => state.username,
);

export const selectProfileImagename = createSelector(
  profileFeature,
  (state: ProfileState) => state.details?.imageFileName,
);

export const selectProfileDetails = createSelector(
  profileFeature,
  (state: ProfileState) => state.details,
);

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private profileService: ProfileService) {}

  LoadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileDetails),
      switchMap((action) =>
        this.profileService.loadUserDetails(action.username).pipe(
          switchMap((details: any) => {
            if (details.teamName !== '') {
              return [
                loadProfileDetailsSuccess({ details }),
                loadTreesByUser({ username: action.username, page: 0, size: 15 }),
                loadTeamDetails({ teamName: details.teamName }),
              ];
            } else {
              return [
                loadProfileDetailsSuccess({ details }),
                loadTreesByUser({ username: action.username, page: 0, size: 15 }),
              ];
            }
          }),
        ),
      ),
    ),
  );

  IsAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAdminFlag),
      switchMap((action) =>
        this.profileService
          .isAdmin()
          .pipe(switchMap((isAdmin: boolean) => [loadAdminFlagSuccess({ isAdmin })])),
      ),
    ),
  );

  LoadTreesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreesByUser),
      switchMap((action) =>
        this.profileService.loadTrees(action.username, action.page, action.size).pipe(
          switchMap((res) => {
            if (res && res.content) {
              const trees: ProfileTree[] = [];
              for (const tree of res.content) {
                const projectName = tree.projectArticle?.project?.name
                  ? tree.projectArticle?.project?.name
                  : 'Community';
                trees.push({
                  id: tree.id,
                  amount: tree.amount,
                  imagePath: tree.imagePath,
                  longitude: tree.longitude,
                  latitude: tree.latitude,
                  submittedOn: new Date(tree.submittedOn),
                  plantedOn: new Date(tree.plantedOn),
                  projectName,
                  treeTypeName: tree.treeType?.name,
                  treeTypeImageUrl: `${environment.backendUrl}/treeType/image/${tree.treeType?.imageFile}/60/60`,
                });
                res.content = trees;
              }
            }
            return [loadTreesByUserSuccess({ trees: res })];
          }),
        ),
      ),
    ),
  );
}
