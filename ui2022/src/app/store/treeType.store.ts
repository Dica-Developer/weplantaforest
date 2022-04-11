import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { TreeType } from './project.store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TreeTypeService } from '../services/treeType.service';
import { switchMap } from 'rxjs/operators';

export const loadTreeTypes = createAction('[Treetypes] load treetypes');
export const loadTreeTypesSuccess = createAction(
  '[Treetypes] load treetypes success',
  props<{ treeTypes: TreeType[] }>()
);

export interface TreeTypeState {
  treeTypes: TreeType[];
}

export const initialState: TreeTypeState = {
  treeTypes: [],
};

export const treeTypeReducer = createReducer(
  initialState,
  on(loadTreeTypesSuccess, (state, { treeTypes }) => ({
    ...state,
    treeTypes,
  }))
);

export function treeTypeReducerFn(state, action) {
  return treeTypeReducer(state, action);
}

export const treeTypeFeature = (state: AppState) => state.treeTypes;

export const selectTreeTypes = createSelector(
  treeTypeFeature,
  (state: TreeTypeState) => state.treeTypes
);

@Injectable()
export class TreeTypeEffects {
  constructor(
    private actions$: Actions,
    private treeTypeService: TreeTypeService
  ) {}

  LoadTreeTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreeTypes),
      switchMap((action) =>
        this.treeTypeService
          .loadAll()
          .pipe(
            switchMap((treeTypes: TreeType[]) => [
              loadTreeTypesSuccess({ treeTypes }),
            ])
          )
      )
    )
  );
}
