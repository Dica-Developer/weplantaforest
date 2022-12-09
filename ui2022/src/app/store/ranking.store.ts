import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { RankingService } from '../services/ranking.service';
import { AppState, PagedData } from './app.state';

export const loadAllRankings = createAction(
  '[Ranking] load all',
  props<{ pageSize: number; lastYear: boolean }>(),
);

export const loadAllRankingsSuccess = createAction(
  '[Ranking] load all success',
  props<{ result: PagedData<TreeRankedUserData> }>(),
);

export interface TreeRankedUserData {
  name: string;
  imageName: string;
  co2Saved: number;
  amount: number;
}

export interface RankingState {
  allRankings: PagedData<TreeRankedUserData>;
  allRankingsLoading: boolean;
}

export const initialState: RankingState = {
  allRankings: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
  },
  allRankingsLoading: false,
};

const rankingReducer = createReducer(
  initialState,
  on(loadAllRankings, (state) => ({
    ...state,
    allRankingsLoading: true,
  })),
  on(loadAllRankingsSuccess, (state, action) => ({
    ...state,
    allRankings: action.result,
    allRankingsLoading: false,
  })),
);

export function rankingReducerFn(state, action) {
  return rankingReducer(state, action);
}

export const rankingFeature = (state: AppState) => state.ranking;

export const selectAllRankings = createSelector(
  rankingFeature,
  (state: RankingState) => state.allRankings,
);

@Injectable()
export class RankingEffects {
  constructor(private actions$: Actions, private rankingService: RankingService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllRankings),
      switchMap((action) =>
        this.rankingService
          .loadAll(action.pageSize, action.lastYear)
          .pipe(
            switchMap((result: PagedData<TreeRankedUserData>) => [
              loadAllRankingsSuccess({ result }),
            ]),
          ),
      ),
    ),
  );
}
