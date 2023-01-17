import { createAction, props, createReducer, on, createSelector } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProjectReportService } from '../services/project-report.service';

export interface ProjectReport {
  id: number;
  name: string;
  description: string;
  imageFileName: string;
  latitude: number;
  longitude: number;
  shopActive: boolean;
  visible: boolean;
}

export interface ProjectReportDetails {
  projectReportData: ProjectReportData;
  images: any[];
  positions: any[];
}

export interface ProjectReportData {
  projectId: number;
  projectName: string;
  description: string;
  projectImageFileName: string;
  latitude: number;
  longitude: number;
  amountOfPlantedTrees: number;
  amountOfMaximumTreesToPlant: number;
  active: boolean;
}

export const loadProjectReports = createAction('[ProjectReport] load project reports');
export const loadProjectReportsSuccess = createAction(
  '[ProjectReport] load project reports success',
  props<{ projectReports: PagedData<ProjectReport> }>(),
);
export const loadProjectReport = createAction(
  '[ProjectReport] load project report',
  props<{ projectName: string }>(),
);
export const loadProjectReportSuccess = createAction(
  '[ProjectReport] load project report success',
  props<{ projectReportDetails: ProjectReportDetails }>(),
);
export const loadActiveProjectReports = createAction('[ProjectReport] load active project reports');
export const loadActiveProjectReportsSuccess = createAction(
  '[ProjectReport] load project report success',
  props<{ activeProjectReports: any[] }>(),
);

export interface ProjectReportState {
  projectReports: PagedData<ProjectReport>;
  projectReport: any;
  projectsLoading: boolean;
  projectLoading: boolean;
  activeProjects: any[];
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
  activeProjects: [],
  projectsLoading: false,
  projectReport: null,
  projectLoading: false,
};

const projectReportReducer = createReducer(
  initialState,
  on(loadProjectReports, (state) => ({
    ...state,
    projectsLoading: true,
  })),
  on(loadProjectReport, (state) => ({
    ...state,
    projectReport: null,
    projectLoading: true,
  })),
  on(loadProjectReportsSuccess, (state, { projectReports }) => ({
    ...state,
    projectReports,
    projectsLoading: false,
  })),
  on(loadProjectReportSuccess, (state, { projectReportDetails }) => ({
    ...state,
    projectReport: projectReportDetails,
    projectLoading: false,
  })),
  on(loadActiveProjectReportsSuccess, (state, { activeProjectReports }) => ({
    ...state,
    activeProjects: activeProjectReports,
    projectLoading: false,
  })),
);

export function projectsReportReducerFn(state, action) {
  return projectReportReducer(state, action);
}

export const projectsReportsFeature = (state: AppState) => state.projectReportsState;

export const selectProjectReports = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.projectReports,
);
export const selectProjectReport = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.projectReport,
);
export const selectActiveProjectReports = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.activeProjects,
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

  LoadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectReport),
      switchMap((action) =>
        this.projectReportService
          .loadProjectReport(action.projectName)
          .pipe(
            switchMap((projectReportDetails: ProjectReportDetails) => [
              loadProjectReportSuccess({ projectReportDetails }),
            ]),
          ),
      ),
    ),
  );

  LoadActiveProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveProjectReports),
      switchMap((action) =>
        this.projectReportService
          .loadActiveProjectReports()
          .pipe(
            switchMap((activeProjects: any[]) => [
              loadActiveProjectReportsSuccess({ activeProjectReports: activeProjects }),
            ]),
          ),
      ),
    ),
  );
}
