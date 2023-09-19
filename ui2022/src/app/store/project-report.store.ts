import { createAction, props, createReducer, on, createSelector } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProjectReportService } from '../services/project-report.service';
import { environment } from 'src/environments/environment';

export interface ProjectReport {
  id: number;
  name: string;
  description: string;
  imageFileName: string;
  latitude: number;
  longitude: number;
  shopActive: boolean;
  visible: boolean;
  active: boolean;
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
  projectImageUrl: string;
  projectLink: string;
  positions: any[];
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
  '[ProjectReport] load active project reports success',
  props<{ activeProjectReports: any[] }>(),
);
export const loadInActiveProjectReports = createAction(
  '[ProjectReport] load inactive project reports',
  props<{ pageSize: number }>(),
);
export const loadInActiveProjectReportsSuccess = createAction(
  '[ProjectReport] load inactive project reports success',
  props<{ inactiveProjectReports: any[], amountOfInactiveProjects: number }>(),
);

export interface ProjectReportState {
  projectReports: PagedData<ProjectReport>;
  projectReport: any;
  projectsLoading: boolean;
  projectLoading: boolean;
  activeProjects: any[];
  inactiveProjects: any[];
  amountOfInactiveProjects: number;
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
  inactiveProjects: [],
  amountOfInactiveProjects: 0,
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
  on(loadInActiveProjectReportsSuccess, (state, { inactiveProjectReports, amountOfInactiveProjects }) => ({
    ...state,
    inactiveProjects: inactiveProjectReports,
    amountOfInactiveProjects,
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
export const selectInActiveProjectReports = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.inactiveProjects,
);

export const selectAmountOfInactiveProjects = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.amountOfInactiveProjects,
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
        this.projectReportService.loadActiveProjectReports().pipe(
          switchMap((activeProjects: any[]) => {
            if (activeProjects) {
              const projects: ProjectReportData[] = [];
              for (const report of activeProjects) {
                projects.push({
                  projectId: report.projectId,
                  projectName: report.projectName,
                  description: report.description,
                  projectImageFileName: report.projectImageFileName,
                  latitude: report.latitude,
                  longitude: report.longitude,
                  amountOfPlantedTrees: report.amountOfPlantedTrees,
                  amountOfMaximumTreesToPlant: report.amountOfMaximumTreesToPlant,
                  active: report.active,
                  projectImageUrl: `${environment.backendUrl}/projects/image/${report.projectImageFileName}/60/60`,
                  projectLink: `/project/${report.projectName}`,
                  positions: report.positions
                });
                activeProjects = projects;
              }
            }
            return [loadActiveProjectReportsSuccess({ activeProjectReports: activeProjects })];
          }),
        ),
      ),
    ),
  );

  LoadInactiveProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInActiveProjectReports),
      switchMap((action) =>
        this.projectReportService.loadInActiveProjectReports(0, action.pageSize).pipe(
          switchMap((inactiveProjects: any) => {
            if (inactiveProjects) {
              const projects: ProjectReportData[] = [];
              for (const report of inactiveProjects.content) {
                projects.push({
                  projectId: report.projectId,
                  projectName: report.projectName,
                  description: report.description,
                  projectImageFileName: report.projectImageFileName,
                  latitude: report.latitude,
                  longitude: report.longitude,
                  amountOfPlantedTrees: report.amountOfPlantedTrees,
                  amountOfMaximumTreesToPlant: report.amountOfMaximumTreesToPlant,
                  active: report.active,
                  projectImageUrl: `${environment.backendUrl}/projects/image/${report.projectImageFileName}/60/60`,
                  projectLink: `/project/${report.projectName}`,
                  positions: report.positions

                });
                inactiveProjects.content = projects;
              }
            }
            return [
              loadInActiveProjectReportsSuccess({ inactiveProjectReports: inactiveProjects, amountOfInactiveProjects: inactiveProjects.totalElements }),
            ];
          }),
        ),
      ),
    ),
  );
}
