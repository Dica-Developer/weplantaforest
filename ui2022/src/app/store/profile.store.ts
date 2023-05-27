import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { loadTeamDetails } from './team.store';
import { logout } from './auth.store';
import { GiftService, GiftStatus } from '../services/gift.service';

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
export const updateProfileProperty = createAction(
  '[Profile] update Detail',
  props<{ username: string; propertyToUpdate: string; controlValue }>(),
);
export const updateProfilePropertySuccess = createAction(
  '[Profile] update Detail success',
  props<{ propertyToUpdate: string; controlValue }>(),
);

export const loadGiftsAsConsignor = createAction(
  '[Profile] load gifts as consignor',
  props<{ userName: string }>(),
);

export const loadGiftsAsConsignorSuccess = createAction(
  '[Profile] load gifts as consignor success',
  props<{ gifts: ProfileGift[] }>(),
);

export const loadGiftsAsRecipient = createAction(
  '[Profile] load gifts as recipient',
  props<{ userName: string }>(),
);

export const loadGiftsAsRecipientSuccess = createAction(
  '[Profile] load gifts as recipient success',
  props<{ gifts: ProfileGift[] }>(),
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
  newsletter: boolean;
  organisation: string;
  organizationType: string;
  rank: number;
  regDate: Date;
  teamName: string;
  userName: string;
  trees: PagedData<ProfileTree>;
  gifts: {
    consignor: ProfileGift[];
    recipient: ProfileGift[];
  };
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
  projectLink: string;
}

export interface ProfileGift {
  id: number;
  status: GiftStatus;
  recipient: { name: string };
  consignor: { name: string };
  code: {
    cart: {
      totalprice: number;
      treeCount: number;
    };
    code: string;
  };
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
  on(updateProfilePropertySuccess, (state, { propertyToUpdate, controlValue }) => {
    return {
      ...state,
      details: {
        ...state.details,
      },
    };
  }),
  on(loadGiftsAsConsignorSuccess, (state, { gifts }) => ({
    ...state,
    details: {
      ...state.details,
      gifts: {
        ...state.details.gifts,
        consignor: gifts,
      },
    },
  })),
  on(loadGiftsAsRecipientSuccess, (state, { gifts }) => ({
    ...state,
    details: {
      ...state.details,
      gifts: {
        ...state.details.gifts,
        recipient: gifts,
      },
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
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private giftService: GiftService,
  ) {}

  LoadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileDetails),
      switchMap((action) =>
        this.profileService.loadUserDetails(action.username).pipe(
          switchMap((details: any) => {
            const actions = [];
            actions.push(loadProfileDetailsSuccess({ details }));
            actions.push(loadTreesByUser({ username: action.username, page: 0, size: 15 }));
            actions.push(loadGiftsAsConsignor({ userName: action.username }));
            actions.push(loadGiftsAsRecipient({ userName: action.username }));
            if (details.teamName !== '') {
              actions.push(loadTeamDetails({ teamName: details.teamName }));
            }

            return actions;
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
                const projectLink = tree.projectArticle?.project?.name
                  ? `/project/${tree.projectArticle?.project?.name}`
                  : null;
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
                  projectLink,
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

  UpdateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfileProperty),
      switchMap((action) =>
        this.profileService
          .updateProfile(action.username, action.propertyToUpdate, action.controlValue)
          .pipe(
            switchMap(() => {
              if (action.propertyToUpdate === 'NAME') {
                return [logout()];
              } else {
                return [loadProfileDetails({ username: action.username })];
              }
            }),
          ),
      ),
    ),
  );

  LoadGiftsAsConsignor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGiftsAsConsignor),
      switchMap((action) =>
        this.giftService
          .getGiftsAsConsignor(action.userName)
          .pipe(switchMap((gifts: ProfileGift[]) => [loadGiftsAsConsignorSuccess({ gifts })])),
      ),
    ),
  );

  LoadGiftsAsRecipient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGiftsAsRecipient),
      switchMap((action) =>
        this.giftService
          .getGiftsAsRecipient(action.userName)
          .pipe(switchMap((gifts: ProfileGift[]) => [loadGiftsAsRecipientSuccess({ gifts })])),
      ),
    ),
  );
}
