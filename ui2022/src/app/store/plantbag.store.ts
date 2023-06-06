import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { ActiveProjectArticle } from './project.store';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlantbagService } from '../services/plantbag.service';
import { catchError, switchMap } from 'rxjs/operators';
import { addSuccessMessage } from './success-message.state';
import { addCartsToEvent } from './events.store';
import { addError } from './error.state';

export interface PlantbagItem {
  article: ActiveProjectArticle;
  amount: number;
}

export const noopAction = createAction('[Noop] does literally nothing');

export const addPlantbag = createAction(
  '[Plantbag] add plantbag',
  props<{ items: PlantbagItem[] }>(),
);

export const addPlantbagItem = createAction('[Plantbag] add item', props<{ item: PlantbagItem }>());

export const removePlantbagItem = createAction(
  '[Plantbag] remove item',
  props<{ articleId: number }>(),
);

export const validatePlantbag = createAction(
  '[Plantbag] validate',
  props<{ request: any; followUpAction: any }>(),
);

export const setPlantbagValid = createAction('[Plantbag] set valid', props<{ valid: boolean }>());

export const generateCodes = createAction(
  '[Plantbag] generate codes',
  props<{ request: any; eventId: number }>(),
);

export const plantForUser = createAction('[Plantbag] plant for user', props<{ request: any }>());

export const resetPlantbag = createAction('[Plantbag] reset plantbag');

export interface PlantbagState {
  plantbagItems: PlantbagItem[];
  valid?: boolean;
}

export const initialState: PlantbagState = {
  plantbagItems: [],
};

const plantbagReducer = createReducer(
  initialState,
  on(addPlantbagItem, (state, { item }) => {
    //if item already exists, update amount
    if (
      state.plantbagItems.findIndex(
        (pbItem) => pbItem.article.articleId == item.article.articleId,
      ) !== -1
    ) {
      return {
        ...state,
        plantbagItems: state.plantbagItems
          .map((pbItem) => ({ ...pbItem }))
          .map((pbItem) => {
            if (pbItem.article.articleId == item.article.articleId) {
              return {
                ...pbItem,
                amount: item.amount,
              };
            } else {
              return pbItem;
            }
          }),
      };
    } else {
      //if not just add the item
      return {
        ...state,
        plantbagItems: [...state.plantbagItems, item],
      };
    }
  }),
  on(removePlantbagItem, (state, { articleId }) => ({
    ...state,
    plantbagItems: state.plantbagItems.filter((item) => item.article.articleId !== articleId),
  })),
  on(resetPlantbag, (state) => ({
    ...state,
    plantbagItems: [],
  })),
  on(addPlantbag, (state, action) => ({
    ...state,
    plantbagItems: action.items,
  })),
  on(setPlantbagValid, (state, { valid }) => ({
    ...state,
    valid: valid,
  })),
);

export function plantbagReducerFn(state, action) {
  return plantbagReducer(state, action);
}

export const plantbagFeature = (state: AppState) => state.plantbagState;

export const selectPlantbag = createSelector(plantbagFeature, (state: PlantbagState) => state);

export const selectPlantbagPrice = createSelector(plantbagFeature, (state: PlantbagState) =>
  calcPlantbagPrice(state),
);

export const selectPlantbagValid = createSelector(
  plantbagFeature,
  (state: PlantbagState) => state.valid,
);

export const selectPlantbagPriceFormatted = createSelector(
  plantbagFeature,
  (state: PlantbagState) => {
    const priceFormatted = parseFloat(calcPlantbagPrice(state) + '').toFixed(2) + '€';
    return priceFormatted;
  },
);

export function calcPlantbagPrice(plantbag: PlantbagState): number {
  let price = 0;
  for (const item of plantbag.plantbagItems) {
    price += (item.amount * item.article.price.priceAsLong) / 100;
  }
  return price;
}

export function createPlantbagForBackend(plantbag: PlantbagState) {
  const price = calcPlantbagPrice(plantbag) * 100;
  let projects = {};
  for (const item of plantbag.plantbagItems) {
    if (!projects[item.article.project.name]) {
      const projectToAdd = {
        id: item.article.project.id,
        name: item.article.project.name,
        plantItems: {},
      };
      projectToAdd.plantItems[item.article.treeType.name] = {
        amount: item.amount,
        imageFile: item.article.treeType.imageFile,
        price: item.article.price.priceAsLong,
      };
      projects[item.article.project.name] = projectToAdd;
    } else {
      projects[item.article.project.name].plantItems[item.article.treeType.name] = {
        amount: item.amount,
        imageFile: item.article.treeType.imageFile,
        price: item.article.price.priceAsLong,
      };
    }
  }

  const request = {
    price,
    projects,
  };
  return request;
}

export function convertCartToPlantbag(cart, activeProjects) {
  const plantBag = {
    plantbagItems: [],
  };
  for (const cartItem of cart.cartItems) {
    const plantbagItem = {
      article: {
        articleId: cartItem.tree.projectArticle.articleId,
        treeType: {
          name: cartItem.tree.treeType.name,
          imageFile: cartItem.tree.treeType.treeImageColor,
        },
        project: {
          id: cartItem.tree.projectArticle.project.id,
          name: cartItem.tree.projectArticle.project.name,
        },
        price: {
          priceAsLong: cartItem.tree.projectArticle.price.amount * 100,
        },
        alreadyPlanted: findAlreadyPlantedFromActiveProjects(
          cartItem.tree.projectArticle.articleId,
          activeProjects,
        ),
        amount: findAmountFromActiveProjects(
          cartItem.tree.projectArticle.articleId,
          activeProjects,
        ),
      },
      amount: cartItem.amount,
    };
    plantBag.plantbagItems.push(plantbagItem);
  }
  return plantBag;
}

function findAlreadyPlantedFromActiveProjects(articleId, activeProjects) {
  for (const project of activeProjects) {
    for (const article of project.articles) {
      if (article.articleId === articleId) {
        return article.alreadyPlanted;
      }
    }
  }
  return 0;
}

function findAmountFromActiveProjects(articleId, activeProjects) {
  for (const project of activeProjects) {
    for (const article of project.articles) {
      if (article.articleId === articleId) {
        return article.amount;
      }
    }
  }
  return 0;
}

@Injectable()
export class PlantbagEffects {
  constructor(private actions$: Actions, private plantbagService: PlantbagService) {}

  ValidatePlantbag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validatePlantbag),
      switchMap((action) =>
        this.plantbagService.validatePlantbag(action.request.plantBag).pipe(
          switchMap((response: any) => [action.followUpAction, setPlantbagValid({ valid: true })]),
          catchError((error) => {
            return [
              addError({
                error: {
                  key: 'PLANTBAG_VALIDATION_FAILED',
                  message: 'treesInvalid',
                },
              }),
            ];
          }),
        ),
      ),
    ),
  );

  GenerateCodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateCodes),
      switchMap((action) =>
        this.plantbagService.plantForUser(action.request).pipe(
          switchMap((cartIds: number[]) => [
            addCartsToEvent({ cartIds, eventId: action.eventId }),
            addSuccessMessage({
              message: {
                key: 'CARTS_GENERATED',
                message: 'Pflanzkörbe wurden generiert!',
              },
            }),
          ]),
        ),
      ),
    ),
  );

  PlantForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(plantForUser),
      switchMap((action) =>
        this.plantbagService.plantForUser(action.request).pipe(
          switchMap((cartIds: number[]) => [
            addSuccessMessage({
              message: {
                key: 'CARTS_GENERATED',
                message: 'Pflanzkorb wurde generiert!',
              },
            }),
            resetPlantbag(),
          ]),
        ),
      ),
    ),
  );
}
