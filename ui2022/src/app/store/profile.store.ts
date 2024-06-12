import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../services/profile.service';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { loadTeamDetails } from './team.store';
import { logout } from './auth.store';
import { GiftService, GiftStatus } from '../services/gift.service';
import { addError } from './error.state';
import { addSuccessMessage } from './success-message.state';
import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PlatformHelper } from '../util/helper/platform.helper';

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

export const redeemGift = createAction('[Profile] redeem gift', props<{ code: string }>());

export const redeemGiftSuccess = createAction('[Profile] redeem gift success');

export const openGiftPdf = createAction('[Profile] open gift pdf', props<{ id: number }>());

export const loadReceipts = createAction('[Profile] load receipts');

export const loadReceiptsSuccess = createAction(
  '[Profile] load receipts success',
  props<{ receipts: ProfileReceipt[] }>(),
);

export const loadProfileCarts = createAction('[Profile] load profile carts');

export const loadProfileCartsSuccess = createAction(
  '[Profile] load profile carts success',
  props<{ carts: ProfileCart[] }>(),
);

export const createCertificate = createAction(
  '[Profile] create certificate',
  props<{ requestDto: CreateCertificateRequestDto }>(),
);

export const openCertificatePdf = createAction(
  '[Profile] open certificate pdf',
  props<{ id: string }>(),
);

export const findCertificatePlantings = createAction(
  '[Profile] find certificate',
  props<{ id: string }>(),
);

export const findCertificatePlantingsSuccess = createAction(
  '[Profile] find certificate success',
  props<{ plantings: CertificatePlanting[] }>(),
);

export const findCertificateSummary = createAction(
  '[Profile] find certificate summary',
  props<{ id: string }>(),
);

export const findCertificateSummarySuccess = createAction(
  '[Profile] find certificate summary success',
  props<{ summary: any }>(),
);

export const updateProfileImage = createAction(
  '[Profile] update profile image',
  props<{ userName: string; image: File }>(),
);

export const updateProfileImageSuccess = createAction(
  '[Profile] update profile image success',
  props<{ newImageFileName: string }>(),
);

export const resetProfileDetails = createAction('[Profile] reset profile details');

export const setHasTeam = createAction('[Profile] set team name', props<{ hasTeam: boolean }>());

export const updateProfileImageError = createAction('[Profile] update profile image error');

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
  receipts: ProfileReceipt[];
  carts: ProfileCart[];
}

export interface ProfileState {
  username: string;
  hasTeam: boolean;
  isAdmin: boolean;
  details: ProfileDetails;
  uploadingImage: boolean;
  certificate: {
    plantings: CertificatePlanting[];
    creator: { name: string };
    text: string;
  };
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

export interface ProfileReceipt {
  receiptId: number;
  createdOn: Date;
  invoiceNumber: string;
}

export interface ProfileCart {
  id: number;
  totalPrice: number;
  treeCount: number;
  timeStamp: Date;
}

export interface CreateCertificateRequestDto {
  cartIds: number[];
  text: string;
}

export interface CertificatePlanting {
  amount: number;
  description: string;
  id: number;
  imagePath: string;
  latitude: number;
  longitude: number;
  owner: { name: string };
  plantedOn: number;
  projectArticle: { project: { name: string } };
  submittedOn: number;
  treeType: {
    id: number;
    description: string;
    fruit: string;
    fruitImageBW: string;
    fruitImageColor: string;
    leaf: string;
    name: string;
    treeImageBW: string;
    treeImageColor: string;
    trunk: string;
    trunkImageColor: string;
  };
}

export const initialState: ProfileState = {
  username: '',
  hasTeam: false,
  isAdmin: false,
  details: null,
  uploadingImage: false,
  certificate: {
    plantings: [],
    creator: { name: '' },
    text: '',
  },
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
  on(loadReceiptsSuccess, (state, { receipts }) => ({
    ...state,
    details: {
      ...state.details,
      receipts,
    },
  })),
  on(loadProfileCartsSuccess, (state, { carts }) => ({
    ...state,
    details: {
      ...state.details,
      carts,
    },
  })),
  on(findCertificatePlantingsSuccess, (state, { plantings }) => ({
    ...state,
    certificate: {
      ...state.certificate,
      plantings,
    },
  })),
  on(findCertificateSummarySuccess, (state, { summary }) => ({
    ...state,
    certificate: {
      ...state.certificate,
      text: summary.text,
      creator: summary.creator,
    },
  })),
  on(updateProfileImage, (state, {}) => ({
    ...state,
    uploadingImage: true,
  })),
  on(updateProfileImageError, (state, {}) => ({
    ...state,
    uploadingImage: false,
  })),
  on(updateProfileImageSuccess, (state, { newImageFileName }) => ({
    ...state,
    uploadingImage: false,
    details: {
      ...state.details,
      imageFileName: newImageFileName,
      profileImageUrl: `${environment.backendUrl}/user/image/${newImageFileName}/150/150`,
    },
  })),
  on(setHasTeam, (state, { hasTeam }) => ({
    ...state,
    hasTeam,
  })),
  on(resetProfileDetails, (state) => ({
    ...state,
    username: '',
    hasTeam: false,
    isAdmin: false,
    details: null,
    uploadingImage: false,
    certificate: {
      plantings: [],
      creator: { name: '' },
      text: '',
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

export const selectCertificate = createSelector(
  profileFeature,
  (state: ProfileState) => state.certificate,
);

export const selectUploadingImage = createSelector(
  profileFeature,
  (state: ProfileState) => state.uploadingImage,
);

export const selectUserLanguage = createSelector(profileFeature, (state: ProfileState) => {
  return 'en'
});
//  if (localStorage.getItem('lang')) {
//    return localStorage.getItem('lang');
//  } else {
//    if (
//      navigator.language === 'en-US' ||
//      navigator.language === 'en' ||
//      navigator.language === 'en-GB'
//    ) {
//      return 'en';
//    } else {
//      return 'de';
//    }
//  }
//});

export const selectIsUserAdmin = createSelector(
  profileFeature,
  (state: ProfileState) => state.isAdmin,
);

export const selectHasTeam = createSelector(profileFeature, (state: ProfileState) => state.hasTeam);

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private giftService: GiftService,
    private cartService: CartService,
    private translateService: TranslateService,
    private router: Router,
    private platformHelper: PlatformHelper,
  ) {}

  LoadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileDetails),
      switchMap((action) =>
        this.profileService.loadUserDetails(action.username).pipe(
          switchMap((details: any) => {
            const actions = [];
            actions.push(loadProfileDetailsSuccess({ details }));
            actions.push(loadTreesByUser({ username: action.username, page: 0, size: 8 }));
            if (action.username === this.platformHelper.getLocalstorage('username')) {
              actions.push(setHasTeam({ hasTeam: details.teamName !== '' && details.teamName }));
              actions.push(loadGiftsAsConsignor({ userName: action.username }));
              actions.push(loadGiftsAsRecipient({ userName: action.username }));
              actions.push(loadReceipts());
              if (details.lang === 'DEUTSCH') {
                this.platformHelper.setLocalstorage('lang', 'de');
                this.translateService.use('de');
              } else if (details.lang === 'ENGLISH') {
                this.translateService.use('en');
                this.platformHelper.setLocalstorage('lang', 'en');
              }
            }
            if (details.teamName !== '') {
              actions.push(loadTeamDetails({ teamName: details.teamName }));
            }
            actions.push(loadProfileCarts());
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
                let treeTypeImageUrl = `${environment.backendUrl}/treeType/image/${tree.treeType?.treeImageColor}/60/60`;
                if (projectName === 'Community' && tree.imagePath && tree.imagePath !== '') {
                  treeTypeImageUrl = `${environment.backendUrl}/tree/image/${tree.imagePath}/60/60`;
                }
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
                  treeTypeImageUrl,
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
      concatMap((action) =>
        this.profileService
          .updateProfile(action.username, action.propertyToUpdate, action.controlValue)
          .pipe(
            switchMap(() => {
              if (
                action.propertyToUpdate === 'NAME' ||
                action.propertyToUpdate === 'MAIL' ||
                action.propertyToUpdate === 'PASSWORD'
              ) {
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

  RedeemGift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(redeemGift),
      switchMap((action) =>
        this.giftService.redeemGift(action.code).pipe(
          switchMap(() => {
            this.router.navigate(['/user/' + this.platformHelper.getLocalstorage('username')]);
            return [
              addSuccessMessage({ message: { key: 'GIFT_REDEEMED', message: 'GIFT_REDEEMED' } }),
            ];
          }),
          catchError((err) => [
            addError({
              error: { message: err.error.errorInfos[0].errorCode, key: 'REDEEM_GIFT_ERROR' },
            }),
          ]),
        ),
      ),
    ),
  );

  OpenGiftPdf$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openGiftPdf),
        switchMap((action) =>
          this.giftService.openGiftPdf(action.id).pipe(
            switchMap((result: any) => {
              const file = new Blob([result], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              if (this.platformHelper.checkIfBrowser()) {
                window.open(fileURL);
              }
              return [];
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  LoadReceipts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReceipts),
      switchMap((action) =>
        this.cartService.getReceipts().pipe(
          switchMap((results: any[]) => {
            const receipts: ProfileReceipt[] = [];
            results = results.reverse();
            for (const result of results) {
              receipts.push({
                receiptId: result.receiptId,
                invoiceNumber: result.invoiceNumber,
                createdOn: new Date(result.createdOn),
              });
            }
            return [loadReceiptsSuccess({ receipts })];
          }),
        ),
      ),
    ),
  );

  LoadShortCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileCarts),
      switchMap((action) =>
        this.cartService.loadProfileCarts().pipe(
          switchMap((carts: ProfileCart[]) => {
            return [loadProfileCartsSuccess({ carts })];
          }),
        ),
      ),
    ),
  );

  CreateCertificate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCertificate),
      switchMap((action) =>
        this.profileService.createCertificate(action.requestDto).pipe(
          switchMap((id: string) => {
            return [openCertificatePdf({ id })];
          }),
        ),
      ),
    ),
  );

  OpenCertificatePdf$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openCertificatePdf),
        switchMap((action) =>
          this.profileService.openCertificatePdf(action.id).pipe(
            switchMap((result: any) => {
              const file = new Blob([result], { type: 'application/pdf' });
              const fileURL = URL.createObjectURL(file);
              if (this.platformHelper.checkIfBrowser()) {
                window.open(fileURL);
              }
              return [];
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  FindCertificatePlantings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findCertificatePlantings),
      switchMap((action) =>
        this.profileService.findCertificatePlantings(action.id).pipe(
          switchMap((plantings: CertificatePlanting[]) => {
            return [findCertificatePlantingsSuccess({ plantings })];
          }),
        ),
      ),
    ),
  );

  FindCertificateSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findCertificateSummary),
      switchMap((action) =>
        this.profileService.findCertificateSummary(action.id).pipe(
          switchMap((summary: any) => {
            return [findCertificateSummarySuccess({ summary })];
          }),
        ),
      ),
    ),
  );

  UpdateProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfileImage),
      concatMap((action) =>
        this.profileService.updateProfileImage(action.userName, action.image).pipe(
          switchMap((res) => {
            return [
              updateProfileImageSuccess({ newImageFileName: res }),
              loadProfileDetails({ username: action.userName }),
            ];
          }),
          catchError((err) => [updateProfileImageError()]),
        ),
      ),
    ),
  );
}
