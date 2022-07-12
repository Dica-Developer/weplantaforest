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
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { addError } from './error.state';
import { addSuccessMessage } from './success-message.state';

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

export interface ProjectImageCreateEditRequest {
  imageId: number;
  title: string;
  description: string;
  projectId: number;
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
  articles: ProjectArticle[];
  images: ProjectImage[];
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

export interface ActiveProject {
  active: boolean;
  amountOfMaximumTreesToPlant: number;
  amountOfPlantedTrees: number;
  description: string;
  latitude: number;
  longitude: number;
  projectId: number;
  projectImageFileName: string;
  projectName: string;
  articles: ActiveProjectArticle[];
}

export interface ActiveProjectArticle {
  articleId: number;
  alreadyPlanted: number;
  amount: number;
  price: {
    priceAsLong: number;
  };
  treeType: {
    name: string;
    imageFile: string;
  };
  project: {
    id: number;
    name: string;
  };
}

export const loadProjects = createAction('[Project] load projects');
export const loadProjectsSuccess = createAction(
  '[Project] load projects success',
  props<{ projects: GridProject[] }>()
);

export const addGridProject = createAction(
  '[Project] add grid project',
  props<{ project: GridProject }>()
);

export const loadProjectDetails = createAction(
  '[Project] load details',
  props<{ id: number }>()
);
export const resetProjectDetails = createAction('[Project] reset details');
export const loadProjectDetailsSuccess = createAction(
  '[Project] load details success',
  props<{ projectDetails: ProjectDetails }>()
);

export const loadProjectArticles = createAction(
  '[Project] load articles',
  props<{ id: number }>()
);
export const loadProjectArticlesSuccess = createAction(
  '[Project] load articles success',
  props<{ articles: ProjectArticle[] }>()
);

export const addArticle = createAction(
  '[Project] add article',
  props<{ article: ProjectArticle }>()
);

export const deleteArticle = createAction(
  '[Project] delete article',
  props<{ id: number }>()
);
export const deleteArticleSuccess = createAction(
  '[Project] delete article success',
  props<{ id: number }>()
);
export const deleteArticleWithoutId = createAction(
  '[Project] delete article without id',
  props<{ article: ProjectArticle }>()
);

export const loadProjectImages = createAction(
  '[Project] load images',
  props<{ id: number }>()
);
export const loadProjectImagesSuccess = createAction(
  '[Project] load images success',
  props<{ images: ProjectImage[] }>()
);

export const deleteProjectImage = createAction(
  '[Project] delete image',
  props<{ id: number; imageFileName: string }>()
);
export const deleteProjectImageSuccess = createAction(
  '[Project] delete image success',
  props<{ id: number }>()
);

export const createEditProjectImageData = createAction(
  '[Project] create/edit projectImage data',
  props<{ projectImageData: ProjectImageCreateEditRequest; file: any }>()
);

export const addProjectImage = createAction(
  '[Project] add project image',
  props<{ image: ProjectImage }>()
);

export const uploadProjectImage = createAction(
  '[Project] upload image',
  props<{ imageId: number; file: any }>()
);

export const updateProject = createAction(
  '[Project] update',
  props<{ request: ProjectEditRequest; mainImageFile: any }>()
);

export const updateProjectMainImage = createAction(
  '[Project] update mainImage',
  props<{ projectId: number; file: any }>()
);

export const deleteProject = createAction(
  '[Project] delete project',
  props<{ id: number }>()
);
export const deleteProjectSuccess = createAction(
  '[Project] delete project success',
  props<{ id: number }>()
);

export const loadActiveProjects = createAction(
  '[Project] load active projects'
);

export const loadActiveProjectsSuccess = createAction(
  '[Project] load active projects success',
  props<{ activeProjects: ActiveProject[] }>()
);

export const loadActiveProjectArticles = createAction(
  '[Project] load active project articles',
  props<{ id: number; projectName: string }>()
);

export const loadActiveProjectArticlesSuccess = createAction(
  '[Project] load active projects articles success',
  props<{ id: number; articles: ActiveProjectArticle[] }>()
);

export interface ProjectState {
  projects: GridProject[];
  projectsLoading: boolean;
  projectDetails: ProjectDetails;
  projectDetailsLoading: boolean;
  activeProjects: ActiveProject[];
}

export const initialState: ProjectState = {
  projects: [],
  projectsLoading: false,
  projectDetails: null,
  projectDetailsLoading: false,
  activeProjects: [],
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
  on(addGridProject, (state, { project }) => {
    if (state.projects.filter((el) => el.id == project.id).length == 0) {
      return {
        ...state,
        projects: [project, ...state.projects],
      };
    } else {
      return {
        ...state,
      };
    }
  }),
  on(loadProjectDetails, (state) => ({
    ...state,
    projectDetails: null,
    projectDetailsLoading: true,
  })),
  on(resetProjectDetails, (state) => ({
    ...state,
    projectDetails: null,
    projectDetailsLoading: true,
  })),
  on(loadProjectDetailsSuccess, (state, { projectDetails }) => ({
    ...state,
    projectDetails: {
      ...projectDetails,
      articles: [],
      images: [],
    },
    projectDetailsLoading: false,
  })),
  on(loadProjectArticlesSuccess, (state, { articles }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      articles,
    },
  })),
  on(addArticle, (state, { article }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      articles: [...state.projectDetails.articles, article],
    },
  })),
  on(deleteArticleSuccess, (state, { id }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      articles: state.projectDetails.articles.filter(
        (el) => el.articleId != id
      ),
    },
  })),
  on(deleteArticleWithoutId, (state, { article }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      articles: state.projectDetails.articles.filter(
        (el) => el.articleId != null
      ),
    },
  })),
  on(loadProjectImagesSuccess, (state, { images }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      images,
    },
  })),
  on(deleteProjectImageSuccess, (state, { id }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      images: state.projectDetails.images.filter((el) => el.imageId != id),
    },
  })),
  on(addProjectImage, (state, { image }) => ({
    ...state,
    projectDetails: {
      ...state.projectDetails,
      images: [image, ...state.projectDetails.images],
    },
  })),
  on(deleteProjectSuccess, (state, { id }) => ({
    ...state,
    projects: state.projects.filter((project) => project.id != id),
    projectDetails: null,
  })),
  on(loadActiveProjectsSuccess, (state, { activeProjects }) => ({
    ...state,
    activeProjects,
  })),
  on(loadActiveProjectArticlesSuccess, (state, { id, articles }) => ({
    ...state,
    activeProjects: state.activeProjects
      .map((project) => ({ ...project }))
      .map((project) => {
        if (project.projectId == id) {
          return {
            ...project,
            articles,
          };
        } else {
          return project;
        }
      }),
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

export const selectActiveProjects = createSelector(
  projectsFeature,
  (state: ProjectState) => state.activeProjects
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
              loadProjectArticles({ id: action.id }),
              loadProjectImages({ id: action.id }),
            ])
          )
      )
    )
  );

  DeleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      switchMap((action) =>
        this.projectService
          .deleteroject(action.id)
          .pipe(switchMap(() => [deleteProjectSuccess({ id: action.id })]))
      )
    )
  );

  LoadProjectArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectArticles),
      switchMap((action) =>
        this.projectService
          .loadArticles(action.id)
          .pipe(
            switchMap((articles: ProjectArticle[]) => [
              loadProjectArticlesSuccess({ articles }),
            ])
          )
      )
    )
  );

  DeleteProjectArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticle),
      switchMap((action) =>
        this.projectService.removeArticle(action.id).pipe(
          switchMap(() => [deleteArticleSuccess({ id: action.id })]),
          catchError((error) => [
            addError({
              error: { key: 'ARTICLE_DELETE_FAILED', message: error.error },
            }),
          ])
        )
      )
    )
  );

  LoadProjectImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectImages),
      switchMap((action) =>
        this.projectService
          .loadImages(action.id)
          .pipe(
            switchMap((images: ProjectImage[]) => [
              loadProjectImagesSuccess({ images: images.reverse() }),
            ])
          )
      )
    )
  );

  DeleteProjectImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProjectImage),
      switchMap((action) =>
        this.projectService.deleteImage(action.id, action.imageFileName).pipe(
          switchMap(() => [deleteProjectImageSuccess({ id: action.id })]),
          catchError((error) => [
            // addError({
            //   error: { key: 'ARTICLE_DELETE_FAILED', message: error.error },
            // }),
          ])
        )
      )
    )
  );

  CreateEditProjectImageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEditProjectImageData),
      switchMap((action) =>
        this.projectService.createEditImage(action.projectImageData).pipe(
          switchMap((imageId: number) => [
            action.file
              ? uploadProjectImage({
                  imageId,
                  file: action.file,
                })
              : null,
            // loadProjectImagesSuccess({ images }),
          ])
        )
      )
    )
  );

  UploadProjectImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadProjectImage),
      switchMap((action) =>
        this.projectService.uploadImage(action.imageId, action.file).pipe(
          switchMap((images: ProjectImage[]) => [
            // loadProjectImagesSuccess({ images }),
          ])
        )
      )
    )
  );

  UpdateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      switchMap((action) =>
        this.projectService.updateProject(action.request).pipe(
          switchMap((projectId: number) => {
            const project: GridProject = {
              id: projectId,
              name: action.request.name,
            };
            if (action.mainImageFile) {
              return [
                addGridProject({ project }),
                updateProjectMainImage({
                  projectId,
                  file: action.mainImageFile,
                }),
              ];
            } else {
              return [
                addGridProject({ project }),
                addSuccessMessage({
                  message: {
                    key: 'PROJECT_SAVE_SUCCESS',
                    message: 'Projekt wurde gespeichert!',
                  },
                }),
              ];
            }
          }),
          catchError((error) => [
            addError({
              error: {
                key: 'PROJECT_UPDATE_FAILED',
                message: 'Das Speichern ist leider fehlgeschlagen!',
              },
            }),
          ])
        )
      )
    )
  );

  UpdateProjectMainImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProjectMainImage),
      switchMap((action) =>
        this.projectService.updateMainImage(action.projectId, action.file).pipe(
          switchMap(() => [
            addSuccessMessage({
              message: {
                key: 'PROJECT_SAVE_SUCCESS',
                message: 'Projekt wurde gespeichert!',
              },
            }),
            // loadProjectImagesSuccess({ images }),
          ])
          // catchError((error) => [
          //   addError({
          //     error: { key: 'PROJECT_UPDATE_FAILED', message: 'Das Speichern ist leider fehlgeschlagen!' },
          //   }),
          // ])
        )
      )
    )
  );

  LoadActiveProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveProjects),
      switchMap((action) =>
        this.projectService.getActiveProjects().pipe(
          switchMap((activeProjects: ActiveProject[]) => {
            const actions = [];
            actions.push(loadActiveProjectsSuccess({ activeProjects }));
            for (const project of activeProjects) {
              actions.push(
                loadActiveProjectArticles({
                  id: project.projectId,
                  projectName: project.projectName,
                })
              );
            }
            return actions;
          })
        )
      )
    )
  );

  LoadActiveProjectArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveProjectArticles),
      mergeMap((action) =>
        this.projectService
          .getActiveProjectArticlesForProject(action.projectName)
          .pipe(
            mergeMap((articles: ActiveProjectArticle[]) => [
              loadActiveProjectArticlesSuccess({ id: action.id, articles }),
            ])
          )
      )
    )
  );
}
