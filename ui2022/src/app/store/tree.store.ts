import { formatNumber } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ReportService } from '../services/report.service';
import { AppState } from './app.state';

export const getAllTrees = createAction('[Trees] get all trees');
export const getAllTreesSuccess = createAction(
  '[Trees] get all trees success',
  props<{ co2Data: Co2Data }>(),
);

export interface Co2Data {
  treesCount: number;
  co2: number;
}

export interface TreeState {
  allTrees: Co2Data;
}

export const initialState: TreeState = {
  allTrees: {
    treesCount: 0,
    co2: 0,
  },
};

const treeReducer = createReducer(
  initialState,
  on(getAllTreesSuccess, (state, action) => ({
    ...state,
    allTrees: action.co2Data,
  })),
);

export function treeReducerFn(state, action) {
  return treeReducer(state, action);
}

export const treeFeature = (state: AppState) => state.trees;

export const selectAllTreeCount = createSelector(treeFeature, (state: TreeState) => {
  return formatNumber(state.allTrees.treesCount, 'de-DE');
});

@Injectable()
export class TreeEffects {
  constructor(
    private actions$: Actions, // this is an RxJS stream of all actions
    private reportService: ReportService,
  ) {}

  GetAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTrees),
      switchMap((action: any) =>
        this.reportService
          .getAllTrees()
          .pipe(switchMap((co2Data: Co2Data) => [getAllTreesSuccess({ co2Data })])),
      ),
    ),
  );
}
