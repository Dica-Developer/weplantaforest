import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { TreeType } from './project.store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TreeTypeImageType, TreeTypeService } from '../services/treeType.service';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { addSuccessMessage } from './success-message.state';
import { addError } from './error.state';

export interface TreeTypeAdmin {
  annualCo2SavingInTons: number;
  description: string;
  id: number;
  treeImageColor: string;
  treeImageBW: string;
  fruitImageColor: string;
  fruitImageBW: string;
  trunkImageColor: string;
  infoLink: string;
  name: string;
  leaf: string;
  fruit: string;
  trunk: string;
}

export interface TreeTypeImageDTO {
  imageType: TreeTypeImageType;
  imgSrc: any;
}

export const loadTreeTypesForAdmin = createAction('[Treetypes] load treetypes for admin');
export const loadTreeTypesForAdminSuccess = createAction(
  '[Treetypes] load treetypes for admin success',
  props<{ treeTypesForAdmin: TreeTypeAdmin[] }>(),
);

export const loadTreeTypes = createAction('[Treetypes] load treetypes');
export const loadTreeTypesSuccess = createAction(
  '[Treetypes] load treetypes success',
  props<{ treeTypes: TreeType[] }>(),
);

export const updateTreetype = createAction(
  '[Treetypes] update treetype',
  props<{ request: TreeTypeAdmin; images: TreeTypeImageDTO[] }>(),
);

export const uploadTreetypeImage = createAction(
  '[Treetypes] upload image',
  props<{ treeTypeId: number; imageFile: any; imageType: TreeTypeImageType }>(),
);

export const deleteTreeType = createAction(
  '[Treetypes] delete treetyoe',
  props<{ treeTypeId: number }>(),
);

export const deleteTreeTypeSuccess = createAction(
  '[Treetypes] delete treetype success',
  props<{ treeTypeId: number }>(),
);

export const addTreeType = createAction(
  '[Treetypes] add treetype',
  props<{ treeType: TreeTypeAdmin }>(),
);

export interface TreeTypeState {
  treeTypes: TreeType[];
  treeTypesForAdmin: TreeTypeAdmin[];
}

export const initialState: TreeTypeState = {
  treeTypes: [],
  treeTypesForAdmin: [],
};

export const treeTypeReducer = createReducer(
  initialState,
  on(loadTreeTypesSuccess, (state, { treeTypes }) => ({
    ...state,
    treeTypes,
  })),
  on(loadTreeTypesForAdminSuccess, (state, { treeTypesForAdmin }) => ({
    ...state,
    treeTypesForAdmin,
  })),
  on(deleteTreeTypeSuccess, (state, { treeTypeId }) => ({
    ...state,
    treeTypesForAdmin: state.treeTypesForAdmin.filter((tt) => tt.id != treeTypeId),
  })),
  on(addTreeType, (state, { treeType }) => ({
    ...state,
    treeTypesForAdmin: [treeType, ...state.treeTypesForAdmin],
  })),
);

export function treeTypeReducerFn(state, action) {
  return treeTypeReducer(state, action);
}

export const treeTypeFeature = (state: AppState) => state.treeTypesState;

export const selectTreeTypes = createSelector(
  treeTypeFeature,
  (state: TreeTypeState) => state.treeTypes,
);

export const selectTreeTypesForAdmin = createSelector(
  treeTypeFeature,
  (state: TreeTypeState) => state.treeTypesForAdmin,
);

@Injectable()
export class TreeTypeEffects {
  constructor(private actions$: Actions, private treeTypeService: TreeTypeService) {}

  LoadTreeTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreeTypes),
      switchMap((action) =>
        this.treeTypeService.loadAll().pipe(
          switchMap((treeTypes: TreeType[]) => {
            return [loadTreeTypesSuccess({ treeTypes })];
          }),
        ),
      ),
    ),
  );

  LoadTreeTypesForAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreeTypesForAdmin),
      switchMap((action) =>
        this.treeTypeService
          .loadAllForAdmin()
          .pipe(
            switchMap((treeTypesForAdmin: TreeTypeAdmin[]) => [
              loadTreeTypesForAdminSuccess({ treeTypesForAdmin }),
            ]),
          ),
      ),
    ),
  );

  UpdateTreetype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTreetype),
      switchMap((action) =>
        this.treeTypeService.save(action.request).pipe(
          switchMap((id: number) => {
            if (action.images && action.images.length > 0) {
              const uploadActions = [];
              for (const image of action.images) {
                uploadActions.push(
                  uploadTreetypeImage({
                    imageFile: image.imgSrc,
                    treeTypeId: id,
                    imageType: image.imageType,
                  }),
                );
              }
              return uploadActions;
            } else {
              return [
                addSuccessMessage({
                  message: {
                    key: 'TREETYPE_UPDATE_SUCCESS',
                    message: 'Baumart wurde gespeichert!',
                  },
                }),
              ];
            }
          }),
        ),
      ),
    ),
  );

  TreetypeImageUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadTreetypeImage),
      concatMap((action) =>
        this.treeTypeService
          .imageUpload(action.treeTypeId, action.imageFile, action.imageType)
          .pipe(
            concatMap((id: number) => [
              addSuccessMessage({
                message: {
                  key: 'TREETYPE_UPDATE_SUCCESS',
                  message: 'Baumart wurde gespeichert!',
                },
              }),
            ]),
          ),
      ),
    ),
  );

  DeleteTreetype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTreeType),
      switchMap((action) =>
        this.treeTypeService.delete(action.treeTypeId).pipe(
          switchMap((treeTypeId: number) => [
            addSuccessMessage({
              message: {
                key: 'TREETYPE_DELETE_SUCCESS',
                message: 'Baumart wurde gelöscht!',
              },
            }),
            deleteTreeTypeSuccess({ treeTypeId: action.treeTypeId }),
          ]),
          catchError((error) => [
            addError({
              error: {
                key: 'TREETYPE_DELETE_FAILED',
                message: error.error,
              },
            }),
          ]),
        ),
      ),
    ),
  );
}
