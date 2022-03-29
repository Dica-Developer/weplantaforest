import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

export interface TreeType {
  id: number;
  name: string;
}

export interface ProjectPrice {
  amount: number;
  funding: number;
  marge: number;
  priceId: number;
  sconto: number;
  scontoType: string;
}

export interface ProjectArticle {
  amount: number;
  articleId: number;
  price: ProjectPrice;
  treeType: TreeType;
}

export interface ProjectPositionPoint {
  lat: number;
  lng: number;
  order: number;
}

export interface ProjectImage {
  date: number;
  description: string;
  imageFileName: string;
  imageId: number;
  title: string;
}

export interface GridProject {
  id: number;
  name: string;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  imageFileName: string;
  latitude: number;
  longitude: number;
  manager: ProjectManager;
  shopActive: boolean;
  visible: boolean;
  positions: ProjectPositionPoint[];
}

export interface ProjectEditRequest {
  id: number;
  imageFileName: string;
  latitude: number;
  longitude: number;
  manager: ProjectManager;
  name: string;
  positions: ProjectPositionPoint[];
  shopActive: boolean;
  visible: boolean;
  description: string;
  images: ProjectImage[];
  articles: ProjectArticle[];
}

export interface ProjectManager {
  id: number;
  name: string;
}

export const loadProjects = createAction('[Project] load projects');
export const loadProjectsSuccess = createAction(
  '[Project] load projects success',
  props<{ projects: GridProject[] }>()
);

export const loadProjectDetails = createAction(
  '[Project] load details',
  props<{ id: number }>()
);
export const loadProjectDetailsSuccess = createAction(
  '[Project] load details success',
  props<{ projectDetails: ProjectDetails }>()
);

export interface ProjectState {
  projects: GridProject[];
  projectsLoading: boolean;
  projectDetails: ProjectDetails;
  projectDetailsLoading: boolean;
}

export const initialState: ProjectState = {
  projects: [],
  projectsLoading: false,
  projectDetails: null,
  projectDetailsLoading: false,
};

const projectsReducer = createReducer(
  initialState,
  on(loadProjects, (state) => ({
    ...state,
    projectsLoading: true,
  })),
  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    projectsLoading: false,
  })),
  on(loadProjectDetails, (state) => ({
    ...state,
    projectDetails: null,
    projectDetailsLoading: true,
  })),
  on(loadProjectDetailsSuccess, (state, { projectDetails }) => ({
    ...state,
    projectDetails,
    projectDetailsLoading: false,
  }))
);

export function projectsReducerFn(state, action) {
  return projectsReducer(state, action);
}

export const projectsFeature = (state: AppState) => state.projects;

export const selectProjects = createSelector(
  projectsFeature,
  (state: ProjectState) => state.projects
);

export const selectProjectsLoading = createSelector(
  projectsFeature,
  (state: ProjectState) => state.projectsLoading
);

export const selectProjectDetails = createSelector(
  projectsFeature,
  (state: ProjectState) => state.projectDetails
);

export const selectProjectDetailsLoading = createSelector(
  projectsFeature,
  (state: ProjectState) => state.projectDetailsLoading
);

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  LoadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      switchMap((action) =>
        this.projectService
          .loadAll()
          .pipe(
            switchMap((projects: GridProject[]) => [
              loadProjectsSuccess({ projects }),
            ])
          )
      )
    )
  );

  LoadProjectDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectDetails),
      switchMap((action) =>
        this.projectService
          .loadDetails(action.id)
          .pipe(
            switchMap((projectDetails: ProjectDetails) => [
              loadProjectDetailsSuccess({ projectDetails }),
            ])
          )
      )
    )
  );
}
