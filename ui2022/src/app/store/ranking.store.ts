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

export const loadPartners = createAction(
  '[Ranking] load partners',
  props<{ projectName: string; page: number }>(),
);

export const loadPartnersSuccess = createAction(
  '[Ranking] load partners success',
  props<{ partners: PagedData<CarouselItem> }>(),
);

export const loadLatestPlantings = createAction(
  '[Ranking] load latest plantings',
  props<{ projectName: string; page: number }>(),
);

export const loadLatestPlantingsSuccess = createAction(
  '[Ranking] load latest plantings success',
  props<{ plantings: PagedData<CarouselItem> }>(),
);

export interface TreeRankedUserData {
  name: string;
  imageName: string;
  co2Saved: number;
  amount: number;
}

export interface CarouselItem {
  name: string;
  imageName: string;
  amount: number;
}

export interface RankingState {
  rankings: PagedData<TreeRankedUserData>;
  plantings: PagedData<CarouselItem>;
  partners: PagedData<CarouselItem>;
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
  plantings: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
  },
  partners: {
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
  on(loadPartners, (state) => ({
    ...state,
    rankingsLoading: true,
  })),
  on(loadPartnersSuccess, (state, action) => ({
    ...state,
    partners: action.partners,
    rankingsLoading: false,
  })),
  on(loadLatestPlantings, (state) => ({
    ...state,
    rankingsLoading: true,
  })),
  on(loadLatestPlantingsSuccess, (state, action) => ({
    ...state,
    plantings: action.plantings,
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

export const rankingFeature = (state: AppState) => state.rankingState;

export const selectRankings = createSelector(
  rankingFeature,
  (state: RankingState) => state.rankings,
);

export const selectPartners = createSelector(
  rankingFeature,
  (state: RankingState) => state.partners,
);

export const selectPlantings = createSelector(
  rankingFeature,
  (state: RankingState) => state.plantings,
);

export const selectRankingMaxAmount = createSelector(
  rankingFeature,
  (state: RankingState) => state.rankingsMaxAmount,
);

export const selectTotalNumber = createSelector(
  rankingFeature,
  (state: RankingState) => state.rankings.totalElements,
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

  loadPartners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPartners),
      switchMap((action) =>
        this.rankingService
          .loadPartnersForProject(action.projectName, action.page)
          .pipe(
            switchMap((partners: PagedData<CarouselItem>) => [
              loadPartnersSuccess({ partners: partners }),
            ]),
          ),
      ),
    ),
  );

  loadLatestPlantings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLatestPlantings),
      switchMap((action) =>
        this.rankingService
          .loadLatestTreesForProject(action.projectName, action.page)
          .pipe(
            switchMap((plantings: PagedData<CarouselItem>) => [
              loadLatestPlantingsSuccess({ plantings: plantings }),
            ]),
          ),
      ),
    ),
  );
}
