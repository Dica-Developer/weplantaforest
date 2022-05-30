import { Injectable } from '@angular/core';
import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { AppState } from './app.state';
import { TeamService } from '../services/team.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

export interface Team {
  id: number;
  name: string;
}

export const loadTeams = createAction('[Team] load all teams');
export const loadTeamsSuccess = createAction(
  '[Team] load all teams success',
  props<{ teams: Team[] }>()
);

export interface TeamState {
  teams: Team[];
}

export const initialState: TeamState = {
  teams: [],
};

const teamReducer = createReducer(
  initialState,
  on(loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams,
  }))
);

export function teamReducerFn(state, action) {
  return teamReducer(state, action);
}

export const teamsFeature = (state: AppState) => state.teams;

export const selectTeams = createSelector(
  teamsFeature,
  (state: TeamState) => state.teams
);

@Injectable()
export class TeamEffects {
  constructor(private actions$: Actions, private teamService: TeamService) {}

  LoadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeams),
      switchMap(() =>
        this.teamService
          .loadTeams()
          .pipe(switchMap((teams: Team[]) => [loadTeamsSuccess({ teams })]))
      )
    )
  );
}
