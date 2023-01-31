import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from './app.state';
import { TeamService } from '../services/team.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as he from 'he';
import { Co2Data } from './tree.store';
import { environment } from 'src/environments/environment';

export interface Team {
  id: number;
  name: string;
}

export interface TeamDetails {
  id: number;
  name: string;
  rank: number;
  co2Data: Co2Data;
  homepage: string;
  regDate: number;
  type: string;
  teamLeader: string;
  membersAmount: string;
  teamDescrition: string;
  imageFileName: string;
  teamImageUrl: string;
}

export const loadTeams = createAction('[Team] load all teams');
export const loadTeamsSuccess = createAction(
  '[Team] load all teams success',
  props<{ teams: Team[] }>(),
);

export const loadTeamDetails = createAction(
  '[Team] load team details',
  props<{ teamName: string }>(),
);
export const loadTeamDetailsSuccess = createAction(
  '[Team] load team details success',
  props<{ details: TeamDetails }>(),
);

export interface TeamState {
  teams: Team[];
  teamDetails: TeamDetails;
}

export const initialState: TeamState = {
  teams: [],
  teamDetails: null,
};

const teamReducer = createReducer(
  initialState,
  on(loadTeamsSuccess, (state, { teams }) => {
    const teamsDecoded = [];
    for (let team of teams) {
      const teamDecoded = {
        id: team.id,
        name: he.decode(team.name),
      };
      teamsDecoded.push(teamDecoded);
    }
    return {
      ...state,
      teams: teamsDecoded,
    };
  }),
  on(loadTeamDetails, (state) => {
    return {
      ...state,
      teamDetails: null,
    };
  }),
  on(loadTeamDetailsSuccess, (state, { details }) => {
    return {
      ...state,
      teamDetails: {
        ...details,
        teamImageUrl: `${environment.backendUrl}/team/image/${details.imageFileName}/150/150`,
      },
    };
  }),
);

export function teamReducerFn(state, action) {
  return teamReducer(state, action);
}

export const teamsFeature = (state: AppState) => state.teamsState;

export const selectTeams = createSelector(teamsFeature, (state: TeamState) => state.teams);

export const selectTeamDetails = createSelector(
  teamsFeature,
  (state: TeamState) => state.teamDetails,
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
          .pipe(switchMap((teams: Team[]) => [loadTeamsSuccess({ teams })])),
      ),
    ),
  );

  LoadTeamDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamDetails),
      switchMap((action) =>
        this.teamService
          .loadTeamDetails(action.teamName)
          .pipe(
            switchMap((teamDetail: TeamDetails) => [
              loadTeamDetailsSuccess({ details: teamDetail }),
            ]),
          ),
      ),
    ),
  );
}
