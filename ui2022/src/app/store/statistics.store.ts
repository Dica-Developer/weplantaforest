import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { AppState } from './app.state';
import { StatisticsService } from '../services/statistics.service';

export interface StatisticsState {
  treesPerYearLoading: boolean;
  co2Loading: boolean;
  usersLoading: boolean;
  treesOrgTypeLoading: boolean;
  treesPerYear: any[];
  co2: any[];
  usersPerYear: any[];
  treesPerOrgType: any[];
}

export const intialState: StatisticsState = {
  treesPerYearLoading: false,
  co2Loading: false,
  usersLoading: false,
  treesOrgTypeLoading: false,
  treesPerYear: [],
  co2: [],
  usersPerYear: [],
  treesPerOrgType: []
};

export const loadTreesPerYear = createAction(
  '[Stats] load trees per year',
);
export const loadTreesPerYearSuccess = createAction(
  '[Stats] load tress per year success',
  props<{ treesPerYear: any[] }>(),
);
export const loadCo2 = createAction(
  '[Stats] load co2',
);
export const loadCo2Success = createAction(
  '[Stats] load co2 success',
  props<{ co2Saved: any[] }>(),
);
export const loadUsersPerYear = createAction(
  '[Stats] load users per year',
);
export const loadUsersPerYearSuccess = createAction(
  '[Stats] load users per year success',
  props<{ usersPerYear: any[] }>(),
);
export const loadTreesPerOrgType = createAction(
  '[Stats] load trees per organisation type',
);
export const loadTreesPerOrgTypeSuccess = createAction(
  '[Stats] load trees per organisation type success',
  props<{ treesPerOrgType: any[] }>(),
);

const statsReducer = createReducer(
  intialState,
  on(loadTreesPerYear, (state) => ({
    ...state,
    treesPerYearLoading: true,
    treesPerYear: []
  })),
  on(loadTreesPerYearSuccess, (state, {treesPerYear}) => ({
    ...state,
    treesPerYearLoading: false,
    treesPerYear: treesPerYear
  })),
  on(loadCo2, (state) => ({
    ...state,
    co2Loading: true,
    co2: []
  })),
  on(loadCo2Success, (state, {co2Saved}) => ({
    ...state,
    co2Loading: false,
    co2: co2Saved
  })),
  on(loadUsersPerYear, (state) => ({
    ...state,
    usersLoading: true,
    usersPerYear: []
  })),
  on(loadUsersPerYearSuccess, (state, {usersPerYear}) => ({
    ...state,
    usersLoading: false,
    usersPerYear: usersPerYear
  })),
  on(loadTreesPerOrgType, (state) => ({
    ...state,
    treesOrgTypeLoading: true,
    treesPerOrgType: []
  })),
  on(loadTreesPerOrgTypeSuccess, (state, {treesPerOrgType}) => ({
    ...state,
    treesOrgTypeLoading: false,
    treesPerOrgType: treesPerOrgType
  })),
);

export function statsReducerFn(state, action) {
  return statsReducer(state, action);
}

export const statsFeature = (state: AppState) => state.statisticsState;

export const selectTreesPerYearLoading = createSelector(
  statsFeature,
  (state: StatisticsState) => state.treesPerYearLoading,
);
export const selectCo2Loading = createSelector(
  statsFeature,
  (state: StatisticsState) => state.co2Loading,
);
export const selectUsersPerYearLoading = createSelector(
  statsFeature,
  (state: StatisticsState) => state.usersLoading,
);
export const selectTreesPerOrgTypeLoading = createSelector(
  statsFeature,
  (state: StatisticsState) => state.treesOrgTypeLoading,
);
export const selectTreesPerYear = createSelector(
  statsFeature,
  (state: StatisticsState) => state.treesPerYear,
);
export const selectCo2 = createSelector(
  statsFeature,
  (state: StatisticsState) => state.co2,
);
export const selectUsersPerYear = createSelector(
  statsFeature,
  (state: StatisticsState) => state.usersPerYear,
);
export const selectTreesPerOrgType = createSelector(
  statsFeature,
  (state: StatisticsState) => state.treesPerOrgType,
);

@Injectable()
export class StatisticsEffects {
  constructor(private actions$: Actions, private statisticsService: StatisticsService) {}

  loadCo2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCo2),
      switchMap((action) =>
        this.statisticsService.getCo2().pipe(
          switchMap((co2:any) => {
            return [loadCo2Success({co2Saved: co2})];
          }),
        ),
      ),
    ),
  );

  loadTreesPerYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreesPerYear),
      switchMap((action) =>
        this.statisticsService.getTreesPerYear().pipe(
          switchMap((trees:any) => {
            return [loadTreesPerYearSuccess({treesPerYear: trees})];
          }),
        ),
      ),
    ),
  );

  loadUsersPerYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersPerYear),
      switchMap((action) =>
        this.statisticsService.getUsersPerYear().pipe(
          switchMap((users:any) => {
            return [loadUsersPerYearSuccess({usersPerYear: users})];
          }),
        ),
      ),
    ),
  );

  loadTreesPerOrgType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreesPerOrgType),
      switchMap((action) =>
        this.statisticsService.getTreesPerOrgType().pipe(
          switchMap((trees:any) => {
            return [loadTreesPerOrgTypeSuccess({treesPerOrgType: trees})];
          }),
        ),
      ),
    ),
  );

}
