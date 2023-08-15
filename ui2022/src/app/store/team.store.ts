import { Injectable } from '@angular/core';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { AppState } from './app.state';
import { TeamService } from '../services/team.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, switchMap } from 'rxjs/operators';
import * as he from 'he';
import { Co2Data } from './tree.store';
import { environment } from 'src/environments/environment';
import { PagedData } from './app.state';
import { loadProfileDetails } from './profile.store';
import { addSuccessMessage } from './success-message.state';
import { TranslateService } from '@ngx-translate/core';

export interface Team {
  id: number;
  name: string;
}

export interface TeamMember {
  name: string;
  imageName: string;
}

export interface TeamDetails {
  teamId: number;
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

export const createTeam = createAction(
  '[Team] create team',
  props<{ name: string; description: string }>(),
);
export const createTeamSuccess = createAction('[Team] create team success');

export const resetTeamDetails = createAction('[Profile] reset team details');

export const deleteTeam = createAction('[Team] delete team', props<{ teamId: number }>());

export const deleteTeamSuccess = createAction('[Team] delete team success');

export const checkIfAdmin = createAction(
  '[Team] check if user is admin',
  props<{ teamId: number }>(),
);
export const checkIfAdminSuccess = createAction(
  '[Team] check if user is admin success',
  props<{ isAdmin: boolean }>(),
);

export const checkIfMember = createAction(
  '[Team] check if user is member',
  props<{ teamId: number }>(),
);
export const checkIfMemberSuccess = createAction(
  '[Team] check if user is member success',
  props<{ isMember: boolean }>(),
);

export const updateTeam = createAction(
  '[Team] update team',
  props<{ teamId: number; name: string; description: string }>(),
);

export interface TeamState {
  teams: Team[];
  teamDetails: TeamDetails;
  members: PagedData<TeamMember>;
  isAdmin: boolean;
  isMember: boolean;
}

export const initialState: TeamState = {
  teams: [],
  teamDetails: null,
  members: {
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
    content: [],
  },
  isAdmin: false,
  isMember: false,
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
        teamImageUrl: `${environment.backendUrl}/team/image/${details.teamId}/150/150`,
        co2Data: {
          ...details.co2Data,
          co2: parseFloat((Math.round(details.co2Data.co2 * 100) / 100).toFixed(2)),
        },
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
  on(createTeam, (state) => {
    return {
      ...state,
    };
  }),
  on(resetTeamDetails, (state) => {
    return {
      ...state,
      teamDetails: null,
    };
  }),
  on(checkIfAdminSuccess, (state, { isAdmin }) => {
    return {
      ...state,
      isAdmin: isAdmin,
    };
  }),
  on(checkIfMemberSuccess, (state, { isMember }) => {
    return {
      ...state,
      isMember: isMember,
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

export const selectTeamMembers = createSelector(
  teamsFeature,
  (state: TeamState) => state.members ?? [],
);

export const selectIsAdmin = createSelector(teamsFeature, (state: TeamState) => state.isAdmin);
export const selectIsMember = createSelector(teamsFeature, (state: TeamState) => state.isMember);

@Injectable()
export class TeamEffects {
  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private translateService: TranslateService,
  ) {}

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
              checkIfAdmin({ teamId: teamDetail.teamId }),
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

  AddTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTeam),
      switchMap((action) =>
        this.teamService.createTeam(action.name, action.description).pipe(
          concatMap(() => [
            addSuccessMessage({
              message: {
                key: 'TEAM_CREATE_SUCCESS',
                message: this.translateService.instant('teamCreated'),
              },
            }),
            loadProfileDetails({ username: localStorage.getItem('username') }),
          ]),
        ),
      ),
    ),
  );

  UpdateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeam),
      switchMap((action) =>
        this.teamService.updateTeam(action.teamId, action.name, action.description).pipe(
          concatMap(() => [
            addSuccessMessage({
              message: {
                key: 'TEAM_UPDATE_SUCCESS',
                message: this.translateService.instant('teamUpdated'),
              },
            }),
            createTeamSuccess(),
            loadProfileDetails({ username: localStorage.getItem('username') }),
          ]),
        ),
      ),
    ),
  );

  DeleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTeam),
      switchMap((action) =>
        this.teamService.deleteTeam(action.teamId).pipe(
          concatMap(() => {
            return [
              addSuccessMessage({
                message: {
                  key: 'TEAM_DELETE_SUCCESS',
                  message: this.translateService.instant('teamDeleted'),
                },
              }),
              resetTeamDetails(),
              loadProfileDetails({ username: localStorage.getItem('username') }),
            ];
          }),
        ),
      ),
    ),
  );

  checkIfAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkIfAdmin),
      switchMap((action) =>
        this.teamService.isTeamAdmin(action.teamId).pipe(
          concatMap((result) => {
            return [checkIfAdminSuccess({ isAdmin: result })];
          }),
        ),
      ),
    ),
  );

  checkIfMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkIfMember),
      switchMap((action) =>
        this.teamService.isTeamMember(action.teamId).pipe(
          concatMap((result) => {
            return [checkIfMemberSuccess({ isMember: result })];
          }),
        ),
      ),
    ),
  );
}
