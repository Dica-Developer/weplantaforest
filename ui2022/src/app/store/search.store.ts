import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { SearchService } from '../services/search.service';
import { AppState } from './app.state';
import * as he from 'he';

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
  link: string;
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
    result: decodeNames(action.result),
  })),
);

function decodeNames(bResult: SearchResult) {
  const result: SearchResult = {
    teams: [],
    projects: [],
    user: [],
  };
  for (const user of bResult.user) {
    result.user.push({ id: user.id, name: he.decode(user.name), link: user.link });
  }
  for (const team of bResult.teams) {
    result.teams.push({ id: team.id, name: he.decode(team.name), link: team.link });
  }
  for (const project of bResult.projects) {
    result.projects.push({ id: project.id, name: he.decode(project.name), link: project.link });
  }
  return result;
}

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
