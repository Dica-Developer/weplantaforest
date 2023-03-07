import { Injectable } from '@angular/core';
import { createAction, props, createReducer, on, createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContentService } from '../services/content.service';
import { switchMap } from 'rxjs/operators';
import { addSuccessMessage } from './success-message.state';

export interface ContentGridEntry {
  id: number;
  title: string;
  articleType: string;
  lang: string;
  createdOn: number;
}

export interface ContentArticleDetails {
  id: number;
  articleType: string;
  createdOn: number;
  imageDescription: string;
  imageFileName: string;
  intro: string;
  lang: string;
  paragraphs: ContentParagraph[];
  showFull: boolean;
  title: string;
  visible: boolean;
  owner: ArticleOwner;
}

export interface ContentParagraph {
  id: number;
  imageDescription: string;
  imageFileName: string;
  text: string;
  title: string;
}

export interface ArticleOwner {
  name: string;
}

export const loadContentArticles = createAction('[Content] load all articles');

export const loadContentArticlesSuccess = createAction(
  '[Content] load all articles success',
  props<{ articles: ContentGridEntry[] }>(),
);

export const addContentGridArticle = createAction(
  '[Content] add content grid article',
  props<{ article: ContentGridEntry }>(),
);

export const loadArticleDetails = createAction(
  '[Content] load article details',
  props<{ id: number }>(),
);

export const loadArticleDetailsSuccess = createAction(
  '[Content] load article details success',
  props<{ details: ContentArticleDetails }>(),
);

export const deleteContentArticle = createAction(
  '[Content] delete article',
  props<{ id: number }>(),
);
export const deleteContentArticleSuccess = createAction(
  '[Content] delete article success',
  props<{ id: number }>(),
);

export const loadArticleTypes = createAction('[Content] load article types');
export const loadArticleTypesSuccess = createAction(
  '[Content] load article types success',
  props<{ articleTypes: string[] }>(),
);

export const saveContentArticle = createAction(
  '[Content] save article',
  props<{
    request: ContentArticleDetails;
    userName: string;
    paragraphImages: any[];
    articleImage: any;
  }>(),
);

export const uploadArticleImage = createAction(
  '[Content] upload article image',
  props<{ articleId: number; file: any }>(),
);

export const uploadParagraphImage = createAction(
  '[Content] upload paragraph image',
  props<{ articleId: number; paragraphId: number; file: any }>(),
);

export interface ContentState {
  articles: ContentGridEntry[];
  articlesLoading: boolean;
  articleTypes: string[];
  details: ContentArticleDetails;
  detailsLoading: boolean;
}

export const intialState: ContentState = {
  articles: [],
  articlesLoading: false,
  articleTypes: [],
  details: null,
  detailsLoading: false,
};

const contentReducer = createReducer(
  intialState,
  on(loadContentArticles, (state) => ({
    ...state,
    articlesLoading: true,
  })),
  on(loadContentArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
    articlesLoading: false,
  })),
  on(addContentGridArticle, (state, { article }) => ({
    ...state,
    articles: [article, ...state.articles],
    articlesLoading: false,
  })),
  on(deleteContentArticleSuccess, (state, { id }) => ({
    ...state,
    articles: state.articles.filter((article) => article.id != id),
    articlesLoading: false,
  })),
  on(loadArticleTypesSuccess, (state, { articleTypes }) => ({
    ...state,
    articleTypes,
  })),
  on(loadArticleDetails, (state) => ({
    ...state,
    details: null,
    detailsLoading: true,
  })),
  on(loadArticleDetailsSuccess, (state, { details }) => ({
    ...state,
    details,
    detailsLoading: false,
  })),
);

export function contentReducerFn(state, action) {
  return contentReducer(state, action);
}

export const contentFeature = (state: AppState) => state.contentState;

export const selectContentArticles = createSelector(
  contentFeature,
  (state: ContentState) => state.articles,
);
export const selectContentArticlesLoading = createSelector(
  contentFeature,
  (state: ContentState) => state.articlesLoading,
);

export const selectContentArticleTypes = createSelector(
  contentFeature,
  (state: ContentState) => state.articleTypes,
);

export const selectContentArticleDetails = createSelector(
  contentFeature,
  (state: ContentState) => state.details,
);

export const selectContentArticleDetailsLoading = createSelector(
  contentFeature,
  (state: ContentState) => state.detailsLoading,
);

@Injectable()
export class ContentEffects {
  constructor(private actions$: Actions, private contentService: ContentService) {}

  LoadContentArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContentArticles),
      switchMap((action) =>
        this.contentService
          .loadAll()
          .pipe(
            switchMap((articles: ContentGridEntry[]) => [loadContentArticlesSuccess({ articles })]),
          ),
      ),
    ),
  );

  DeleteContentArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContentArticle),
      switchMap((action) =>
        this.contentService
          .delete(action.id)
          .pipe(switchMap(() => [deleteContentArticleSuccess({ id: action.id })])),
      ),
    ),
  );

  LoadArticleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticleTypes),
      switchMap((action) =>
        this.contentService
          .getArticleTypes()
          .pipe(switchMap((articleTypes: string[]) => [loadArticleTypesSuccess({ articleTypes })])),
      ),
    ),
  );

  LoadArticleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticleDetails),
      switchMap((action) =>
        this.contentService
          .getDetails(action.id)
          .pipe(
            switchMap((details: ContentArticleDetails) => [loadArticleDetailsSuccess({ details })]),
          ),
      ),
    ),
  );

  SaveContentArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveContentArticle),
      switchMap((action) =>
        this.contentService.editArticle(action.request, action.userName).pipe(
          switchMap((details: ContentArticleDetails) => {
            const actionArray = [];
            actionArray.push(
              addSuccessMessage({
                message: {
                  key: 'CONTENT_SAVE_SUCCESS',
                  message: 'Artikel wurde gespeichert!',
                },
              }),
            );
            if (action.request.id == null) {
              //if request id was null, which means a new article was generated, so it has to be added to the gridArray
              const article: ContentGridEntry = {
                id: details.id,
                articleType: details.articleType,
                lang: details.lang,
                createdOn: details.createdOn,
                title: details.title,
              };
              actionArray.push(addContentGridArticle({ article }));
              // add response of create article request to details to assure ids are now there
              actionArray.push(loadArticleDetailsSuccess({ details }));
            }

            if (action.articleImage && action.paragraphImages.length > 0) {
              actionArray.push(
                uploadArticleImage({
                  articleId: details.id,
                  file: action.articleImage,
                }),
              );
              for (let pi of action.paragraphImages) {
                //on create there are no paragraphIds, so they has to be found here
                let paragraphId = this.getParagraphId(pi, details);

                actionArray.push(
                  uploadParagraphImage({
                    articleId: details.id,
                    paragraphId: paragraphId,
                    file: pi.imageFile,
                  }),
                );
              }

              return actionArray;
            } else if (action.articleImage && action.paragraphImages.length == 0) {
              actionArray.push(
                uploadArticleImage({
                  articleId: details.id,
                  file: action.articleImage,
                }),
              );
              return actionArray;
            } else if (!action.articleImage && action.paragraphImages.length > 0) {
              for (let pi of action.paragraphImages) {
                //on create there are no paragraphIds, so they has to be found here
                let paragraphId = this.getParagraphId(pi, details);

                actionArray.push(
                  uploadParagraphImage({
                    articleId: details.id,
                    paragraphId: paragraphId,
                    file: pi.imageFile,
                  }),
                );
              }

              return actionArray;
            } else {
              return actionArray;
            }
          }),
        ),
      ),
    ),
  );

  UploadArticleImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadArticleImage),
      switchMap((action) =>
        this.contentService
          .uploadArticleImage(action.file, action.articleId)
          .pipe(switchMap(() => [])),
      ),
    ),
  );

  UploadParagraphImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadParagraphImage),
      switchMap((action) =>
        this.contentService
          .uploadParagraphImage(action.file, action.articleId, action.paragraphId)
          .pipe(switchMap(() => [])),
      ),
    ),
  );

  getParagraphId(paragraphImage: any, details: ContentArticleDetails): number {
    let paragraphId;
    // if there was no paragraphId(when a new paragraph was added for example)
    // instead of the id it is 'no [arrayIndex]'
    if (isNaN(Number(paragraphImage.paragraphId)) && paragraphImage.paragraphId.startsWith('no ')) {
      const arrayIndex = paragraphImage.paragraphId.substring(3);
      paragraphId = details.paragraphs[arrayIndex].id;
    } else {
      paragraphId = paragraphImage.paragraphId;
    }
    return paragraphId;
  }
}
