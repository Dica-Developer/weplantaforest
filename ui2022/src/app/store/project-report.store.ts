import { createAction, props, createReducer, on, createSelector } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProjectReportService } from '../services/project-report.service';

export interface ProjectReport {
  projectId: number;
  name: string;
  description: string;
  imageFileName: string;
  latitude: number;
  longitude: number;
  shopActive: boolean;
  visible: boolean;
}

export const loadProjectReports = createAction('[ProjectReport] load project reports');
export const loadProjectReportsSuccess = createAction(
  '[ProjectReport] load project reports success',
  props<{ projectReports: PagedData<ProjectReport> }>(),
);

export interface ProjectReportState {
  projectReports: PagedData<ProjectReport>;
  projectsLoading: boolean;
}

export const initialState: ProjectReportState = {
  projectReports: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
  },
  projectsLoading: false,
};

const projectReportReducer = createReducer(
  initialState,
  on(loadProjectReports, (state) => ({
    ...state,
    projectsLoading: true,
  })),
  on(loadProjectReportsSuccess, (state, { projectReports }) => ({
    ...state,
    projectReports,
    projectsLoading: false,
  })),
);

export function projectsReportReducerFn(state, action) {
  return projectReportReducer(state, action);
}

export const projectsReportsFeature = (state: AppState) => state.projectReports;

export const selectProjectReports = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.projectReports,
);

@Injectable()
export class ProjectReportsEffects {
  constructor(private actions$: Actions, private projectReportService: ProjectReportService) {}

  LoadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectReports),
      switchMap((action) =>
        this.projectReportService
          .loadAllProjectReports(0, 10)
          .pipe(
            switchMap((projectReports: PagedData<ProjectReport>) => [
              loadProjectReportsSuccess({ projectReports }),
            ]),
          ),
      ),
    ),
  );
}
