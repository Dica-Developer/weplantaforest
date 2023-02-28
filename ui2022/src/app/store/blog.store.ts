import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { AppState, PagedData } from './app.state';

export interface BlogArticle {}

export interface BlogState {
  articlesLoading: boolean;
  blogArticles: PagedData<BlogArticle>;
}

export const intialState: BlogState = {
  articlesLoading: false,
  blogArticles: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    last: true,
    first: true,
  },
};

export const loadBlogArticles = createAction(
  '[Content] load all blog articles',
  props<{ language: string }>(),
);

export const loadBlogArticlesSuccess = createAction(
  '[Content] load all blog articles success',
  props<{ blogArticles: PagedData<BlogArticle> }>(),
);

const blogReducer = createReducer(
  intialState,
  on(loadBlogArticles, (state) => ({
    ...state,
    articlesLoading: true,
  })),
  on(loadBlogArticlesSuccess, (state, { blogArticles }) => ({
    ...state,
    blogArticles,
    articlesLoading: false,
  })),
);

export function blogReducerFn(state, action) {
  return blogReducer(state, action);
}

export const blogFeature = (state: AppState) => state.blogState;

export const selectBlogArticles = createSelector(
  blogFeature,
  (state: BlogState) => state.blogArticles,
);

@Injectable()
export class ProjectReportsEffects {
  constructor(private actions$: Actions, private contentService: ContentService) {}

  LoadBlogArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogArticles),
      switchMap((action) =>
        this.contentService
          .getBlogArticles(action.language)
          .pipe(
            switchMap((blogArticles: PagedData<BlogArticle>) => [
              loadBlogArticlesSuccess({ blogArticles }),
            ]),
          ),
      ),
    ),
  );
}
