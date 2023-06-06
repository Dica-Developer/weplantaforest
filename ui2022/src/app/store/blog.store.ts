import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { AppState, PagedData } from './app.state';
import { ArticleOwner } from './content.store';

export interface BlogArticle {
  id: number;
  createdOn: number;
  lastEditedOn: number;
  articleType: string;
  showFull: boolean;
  title: string;
  intro: string;
  imageFileName: string;
  imageDescription: string;
  owner: ArticleOwner;
  paragraphs: any[];
}

export interface BlogState {
  articlesLoading: boolean;
  blogArticle: any;
  amountOfBlogArticles: number;
  blogArticles: PagedData<BlogArticle>;
}

export const intialState: BlogState = {
  articlesLoading: false,
  blogArticle: null,
  amountOfBlogArticles: 0,
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
  props<{ language: string; pageSize: number }>(),
);
export const loadBlogArticlesSuccess = createAction(
  '[Content] load all blog articles success',
  props<{ articles: PagedData<BlogArticle> }>(),
);
export const loadBlogArticle = createAction(
  '[Content] load  blog article',
  props<{ id: number }>(),
);
export const loadBlogArticleSuccess = createAction(
  '[Content] load blog article success',
  props<{ article: BlogArticle }>(),
);

const blogReducer = createReducer(
  intialState,
  on(loadBlogArticles, (state) => ({
    ...state,
    articlesLoading: true,
  })),
  on(loadBlogArticle, (state) => ({
    ...state,
    blogArticle: null,
    projectLoading: true,
  })),
  on(loadBlogArticlesSuccess, (state, { articles }) => ({
    ...state,
    blogArticles: articles,
    amountOfBlogArticles: articles.totalElements,
    articlesLoading: false,
  })),
  on(loadBlogArticleSuccess, (state, { article }) => ({
    ...state,
    blogArticle: article,
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
export const selectBlogArticlesAmount = createSelector(
  blogFeature,
  (state: BlogState) => state.amountOfBlogArticles,
);
export const selectBlogArticle = createSelector(
  blogFeature,
  (state: BlogState) => state.blogArticle,
);
@Injectable()
export class BlogEffects {
  constructor(private actions$: Actions, private contentService: ContentService) {}

  loadBlogArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogArticles),
      switchMap((action) =>
        this.contentService.getBlogArticles(action.language, 0, action.pageSize).pipe(
          switchMap((blogArticles: PagedData<BlogArticle>) => {
            return [loadBlogArticlesSuccess({ articles: blogArticles })];
          }),
        ),
      ),
    ),
  );

  loadBlogArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogArticle),
      switchMap((action) =>
        this.contentService.getBlogArticle(action.id).pipe(
          switchMap((blogArticle: BlogArticle) => {
            return [loadBlogArticleSuccess({ article: blogArticle })];
          }),
        ),
      ),
    ),
  );
}
