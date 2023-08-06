import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from './app.state';
import { TeamService } from '../services/team.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as he from 'he';
import { Co2Data } from './tree.store';
import { environment } from 'src/environments/environment';
import { PagedData } from './app.state';

export interface Team {
  id: number;
  name: string;
}

export interface TeamMember {
  name: string;
  imageName: string;
}

export interface TeamDetails {
  id: number;
  teamName: string;
  rank: number;
  co2Data: Co2Data;
  homepage: string;
  regDate: number;
  type: string;
  teamLeader: string;
  membersAmount: string;
  teamDescription: string;
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

export const loadTeamMember = createAction(
  '[Team] load team members',
  props<{ teamName: string; page: number }>(),
);
export const loadTeamMemberSuccess = createAction(
  '[Team] load team members success',
  props<{ members: PagedData<TeamMember> }>(),
);

export interface TeamState {
  teams: Team[];
  teamDetails: TeamDetails;
  members: PagedData<TeamMember>;
}

export const initialState: TeamState = {
  teams: [],
  teamDetails: null,
  members: null,
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
        co2Data: {
          ...details.co2Data,
          co2: parseFloat((Math.round(details.co2Data.co2 * 100) / 100).toFixed(2)),
        }
      },
    };
  }),
  on(loadTeamMember, (state) => {
    return {
      ...state,
      members: null,
    };
  }),
  on(loadTeamMemberSuccess, (state, { members }) => {
    return {
      ...state,
      members: members,
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

export const selectTeamMembers = createSelector(teamsFeature, (state: TeamState) => state.members);

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
              loadTeamMember({ teamName: teamDetail.teamName, page: 0 }),
            ]),
          ),
      ),
    ),
  );

  LoadTeamMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamMember),
      switchMap((action) =>
        this.teamService
          .loadTeamMembers(action.teamName, action.page)
          .pipe(
            switchMap((members: PagedData<TeamMember>) => [loadTeamMemberSuccess({ members })]),
          ),
      ),
    ),
  );
}
