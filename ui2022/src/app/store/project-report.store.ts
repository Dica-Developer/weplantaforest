import { createAction, props, createReducer, on, createSelector } from '@ngrx/store';
import { AppState, PagedData } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProjectReportService } from '../services/project-report.service';
import { environment } from '../../environments/environment';
import { SimplePlantProposal } from './plant.store';
import { PlantbagService } from '../services/plantbag.service';

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
  props<{ inactiveProjectReports: any[]; amountOfInactiveProjects: number }>(),
);
export const loadProjectProposal = createAction(
  '[ProjectReport] load simple project proposal',
  props<{ amountOfTrees: number; projectName: string }>(),
);
export const loadProjectProposalSuccess = createAction(
  '[ProjectReport] load simple project proposal success',
  props<{ simpleProposal: SimplePlantProposal }>(),
);
// export const loadProjectReportDetailsArray = createAction(
//   '[ProjectReport] load all project report details',
//   props<{ projectNames: string[] }>(),
// );
// export const loadProjectReportDetailsArraySuccess = createAction(
//   '[ProjectReport] load all project report details',
//   props<{ observableArray: any[] }>(),
// );

export interface ProjectReportState {
  projectReports: PagedData<ProjectReport>;
  projectReportDetails: ProjectReportDetails;
  // projectReportDetailsArray: any[];
  projectsLoading: boolean;
  projectLoading: boolean;
  activeProjects: ProjectReportDetails[];
  inactiveProjects: ProjectReportData[];
  amountOfInactiveProjects: number;
  simpleProposal: SimplePlantProposal;
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
  projectReportDetails: null,
  // projectReportDetailsArray: [],
  projectLoading: false,
  simpleProposal: null,
};

const projectReportReducer = createReducer(
  initialState,
  on(loadProjectReports, (state) => ({
    ...state,
    projectsLoading: true,
  })),
  on(loadProjectReport, (state) => ({
    ...state,
    projectReportDetails: null,
    projectLoading: true,
  })),
  on(loadProjectReportsSuccess, (state, { projectReports }) => ({
    ...state,
    projectReports,
    projectsLoading: false,
  })),
  on(loadProjectReportSuccess, (state, { projectReportDetails }) => ({
    ...state,
    projectReportDetails: projectReportDetails,
    projectLoading: false,
  })),
  on(loadActiveProjectReportsSuccess, (state, { activeProjectReports }) => ({
    ...state,
    activeProjects: activeProjectReports,
    projectLoading: false,
  })),
  on(
    loadInActiveProjectReportsSuccess,
    (state, { inactiveProjectReports, amountOfInactiveProjects }) => ({
      ...state,
      inactiveProjects: inactiveProjectReports,
      amountOfInactiveProjects,
      projectLoading: false,
    }),
  ),
  on(loadProjectProposalSuccess, (state, { simpleProposal }) => ({
    ...state,
    simpleProposal,
  })),
  // on(loadProjectReportDetailsArraySuccess, (state, { observableArray }) => ({
  //   ...state,
  //   projectReportDetailsArray: observableArray,
  // })),
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
  (state: ProjectReportState) => state.projectReportDetails,
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
export const selectProjectProposal = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => state.simpleProposal,
);
export const selectProjectProposalPrice = createSelector(
  projectsReportsFeature,
  (state: ProjectReportState) => {
    let price = 0;
    if (state.simpleProposal) {
      price = state.simpleProposal.actualPrice / 100;
    }
    return parseFloat(price.toString()).toFixed(2).replace('.', ',');
  },
);
// export const selectProjectDetailsObservableArray = createSelector(
//   projectsReportsFeature,
//   (state: ProjectReportState) => state.projectReportDetailsArray,
// );

@Injectable()
export class ProjectReportsEffects {
  constructor(
    private actions$: Actions,
    private projectReportService: ProjectReportService,
    private plantbagService: PlantbagService,
  ) {}

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

  // LoadProjecReportDetailsArray$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadProjectReportDetailsArray),
  //     switchMap((action) => {
  //       if (action.projectNames) {
  //         let array = [];
  //         for (let name of action.projectNames) {
  //           array.push(this.projectReportService.loadProjectReport(name));
  //         }
  //         return [loadProjectReportDetailsArraySuccess({ observableArray: array })];
  //       } else {
  //         return [];
  //       }
  //     }),
  //   ),
  // );

  LoadActiveProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveProjectReports),
      switchMap((action) =>
        this.projectReportService.loadActiveProjectReports().pipe(
          switchMap((activeProjects: any[]) => {
            if (activeProjects) {
              const projects: ProjectReportDetails[] = [];
              for (const report of activeProjects) {
                // console.log(report);
                projects.push({
                  projectReportData: report.projectReportData,
                  images: report.images,
                  positions: report.positions,
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
              const projects: ProjectReportDetails[] = [];
              for (const report of inactiveProjects) {
                projects.push({
                  projectReportData: report.projectReportData,
                  images: report.images,
                  positions: report.positions,
                });
                inactiveProjects = projects;
              }
            }
            return [
              loadInActiveProjectReportsSuccess({
                inactiveProjectReports: inactiveProjects,
                amountOfInactiveProjects: inactiveProjects.totalElements,
              }),
            ];
          }),
        ),
      ),
    ),
  );

  getSimplePlantProposalForProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectProposal),
      switchMap((action) =>
        this.plantbagService
          .getSimpleProjectPlantProposal(action.amountOfTrees, action.projectName)
          .pipe(
            switchMap((simpleProposal) => [loadProjectProposalSuccess({ simpleProposal })]),
            // catchError((err) => [getSimplePlantProposalFailed()]),
          ),
      ),
    ),
  );
}
