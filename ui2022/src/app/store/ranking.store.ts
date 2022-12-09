import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { RankingService } from '../services/ranking.service';
import { AppState, PagedData } from './app.state';

export declare type RankingType =
  | 'bestUser'
  | 'bestTeam'
  | 'bestOrgType/PRIVATE'
  | 'bestOrgType/COMMERCIAL'
  | 'bestOrgType/NONPROFIT'
  | 'bestOrgType/EDUCATIONAL';

export const loadRankings = createAction(
  '[Ranking] load all',
  props<{ rankingType: RankingType; pageSize: number; lastYear: boolean }>(),
);

export const loadRankingsSuccess = createAction(
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
  rankings: PagedData<TreeRankedUserData>;
  rankingsLoading: boolean;
  rankingsMaxAmount: number;
}

export const initialState: RankingState = {
  rankings: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
  },
  rankingsLoading: false,
  rankingsMaxAmount: 0,
};

const rankingReducer = createReducer(
  initialState,
  on(loadRankings, (state) => ({
    ...state,
    rankingsLoading: true,
  })),
  on(loadRankingsSuccess, (state, action) => ({
    ...state,
    rankings: action.result,
    rankingsMaxAmount: getMaxAmount(action.result.content),
    rankingsLoading: false,
  })),
);

export function rankingReducerFn(state, action) {
  return rankingReducer(state, action);
}

function getMaxAmount(data: TreeRankedUserData[]): number {
  let maxValue = 0;
  for (const item of data) {
    if (item.amount > maxValue) {
      maxValue = item.amount;
    }
  }
  return maxValue;
}

export const rankingFeature = (state: AppState) => state.ranking;

export const selectRankings = createSelector(
  rankingFeature,
  (state: RankingState) => state.rankings,
);

export const selectRankingMaxAmount = createSelector(
  rankingFeature,
  (state: RankingState) => state.rankingsMaxAmount,
);

@Injectable()
export class RankingEffects {
  constructor(private actions$: Actions, private rankingService: RankingService) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRankings),
      switchMap((action) =>
        this.rankingService
          .loadAll(action.rankingType, action.pageSize, action.lastYear)
          .pipe(
            switchMap((result: PagedData<TreeRankedUserData>) => [loadRankingsSuccess({ result })]),
          ),
      ),
    ),
  );
}
