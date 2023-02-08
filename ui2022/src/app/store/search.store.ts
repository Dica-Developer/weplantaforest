import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { SearchService } from '../services/search.service';
import { AppState } from './app.state';

export const search = createAction('[Search] search', props<{ searchValue: string }>());
export const searchSuccess = createAction(
  '[Search] search success',
  props<{ result: SearchResult }>(),
);

export interface SearchResult {
  teams: IdName[];
  user: IdName[];
  projects: IdName[];
}

export interface SearchState {
  result: SearchResult;
  loading: boolean;
}

export interface IdName {
  id: number;
  name: string;
}
export const initialState: SearchState = {
  result: {
    teams: [],
    user: [],
    projects: [],
  },
  loading: false,
};

const searchReducer = createReducer(
  initialState,
  on(search, (state) => ({
    ...state,
    loading: true,
    result: { teams: [], user: [], projects: [] },
  })),
  on(searchSuccess, (state, action) => ({
    ...state,
    loading: false,
    result: action.result,
  })),
);

export function searchReducerFn(state, action) {
  return searchReducer(state, action);
}

export const searchFeature = (state: AppState) => state.searchState;

export const selectSearchResults = createSelector(
  searchFeature,
  (state: SearchState) => state.result,
);

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private searchServie: SearchService) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap((action) =>
        this.searchServie
          .search(action.searchValue)
          .pipe(switchMap((result: SearchResult) => [searchSuccess({ result })])),
      ),
    ),
  );
}
