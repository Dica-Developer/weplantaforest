import { Injectable } from "@angular/core";
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { AppState } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContentService } from '../services/content.service';
import { switchMap } from 'rxjs/operators';

export interface ContentGridEntry {
  id: number;
  title: string;
  articleType: string;
  // owner: string;
  lang: string;
  createdOn: number;
}

export const loadContentArticles = createAction('[Content] load all articles');

export const loadContentArticlesSuccess = createAction(
  '[Content] load all articles success',
  props<{ articles: ContentGridEntry[] }>()
);

export interface ContentState {
  articles: ContentGridEntry[];
  articlesLoading: boolean;
}

export const intialState: ContentState = {
  articles: [],
  articlesLoading: false,
};

const contentReducer = createReducer(
  intialState,
  on(loadContentArticles, (state) => ({
    articlesLoading: true,
  })),
  on(loadContentArticlesSuccess, (state, { articles }) => ({
    articles,
    articlesLoading: false,
  }))
);

export function contentReducerFn(state, action) {
  return contentReducer(state, action);
}

export const contentFeature = (state: AppState) => state.content;

export const selectContentArticles = createSelector(
  contentFeature,
  (state: ContentState) => state.articles
);
export const selectContentArticlesLoading = createSelector(
  contentFeature,
  (state: ContentState) => state.articlesLoading
);


@Injectable()
export class ContentEffects {
  constructor(private actions$: Actions, private contentService: ContentService) {}

  LoadContentArticles$ =  createEffect(() =>
  this.actions$.pipe(
    ofType(loadContentArticles),
    switchMap((action) =>
      this.contentService
        .loadAll()
        .pipe(
          switchMap((articles: ContentGridEntry[]) => [
            loadContentArticlesSuccess({ articles }),
          ])
        )
    )
  )
);
}