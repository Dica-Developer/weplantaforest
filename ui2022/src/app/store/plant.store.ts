import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { PlantbagService } from '../services/plantbag.service';
import { AppState } from './app.state';
import { initialState } from './error.state';
import { addSuccessMessage } from './success-message.state';
import { TranslateService } from '@ngx-translate/core';

export const getSimplePlantProposal = createAction(
  '[Plant] get proposal',
  props<{ amountOfTrees: number }>(),
);

export const getSimplePlantProposalSuccess = createAction(
  '[Plant] get proposal success',
  props<{ simpleProposal: SimplePlantProposal }>(),
);

export const sendSelfPlant = createAction(
  '[Plant] plant tree yourself',
  props<{ selfPlantData: SelfPlantDataDto }>(),
);

export const sendSelfPlantSuccess = createAction('[Plant] plant tree yourself success');

export const uploadSelfPlantImage = createAction(
  '[Plant] upload self plant image',
  props<{ treeId: number; image: any }>(),
);

export const uploadSelfPlantImageSuccess = createAction('[Plant] upload self plant image success');

export const selfPlantFlagReset = createAction('[Plant] reset selfPlantCreated flag');

export interface PlantProposalItem {
  amount: number;
  imageFile: string;
  projectName: string;
  treePrice: number;
  treeType: string;
}

export interface SelfPlantDataDto {
  plantedOn: Date;
  shortDescription: string;
  amount: number;
  imageName: string;
  treeTypeId: number;
  latitude: number;
  longitude: number;
  mainImageFile: any;
}

export interface SimplePlantProposal {
  actualAmountOfTrees: number;
  actualPrice: number;
  plantItems: PlantProposalItem[];
  targetAmountOfTrees: number;
}

export interface PlantProposalState {
  simpleProposal: SimplePlantProposal;
  selfPlantCreated: boolean;
}

export const intialState: PlantProposalState = {
  selfPlantCreated: false,
  simpleProposal: null,
};

const plantProposalReducer = createReducer(
  initialState,
  on(getSimplePlantProposalSuccess, (state, action) => ({
    ...state,
    simpleProposal: action.simpleProposal,
  })),
  on(selfPlantFlagReset, (state) => ({
    ...state,
    selfPlantCreated: false,
  })),
  on(sendSelfPlantSuccess, (state) => ({
    ...state,
    selfPlantCreated: true,
  })),
);
export function plantProposalReducerFn(state, action) {
  return plantProposalReducer(state, action);
}

export const plantPropsalFeature = (state: AppState) => state.plantProposalState;

export const selectSimpleProposal = createSelector(
  plantPropsalFeature,
  (state: PlantProposalState) => state.simpleProposal,
);

export const selectSelfPlantCreated = createSelector(
  plantPropsalFeature,
  (state: PlantProposalState) => state.selfPlantCreated,
);

export const selectProposalPrice = createSelector(
  plantPropsalFeature,
  (state: PlantProposalState) => {
    let price = 0;
    if (state.simpleProposal) {
      price = state.simpleProposal.actualPrice / 100;
    }
    return parseFloat(price.toString()).toFixed(2).replace('.', ',');
  },
);

@Injectable()
export class PlantProposalEffects {
  constructor(
    private actions$: Actions,
    private plantbagService: PlantbagService,
    private translateService: TranslateService,
  ) {}

  getSimplePlantProposal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSimplePlantProposal),
      switchMap((action) =>
        this.plantbagService
          .getPlantProposal(action.amountOfTrees)
          .pipe(switchMap((simpleProposal) => [getSimplePlantProposalSuccess({ simpleProposal })])),
      ),
    ),
  );

  sendSelfPlant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendSelfPlant),
      switchMap((action) =>
        this.plantbagService.plantSelf(action.selfPlantData).pipe(
          switchMap((treeId: number) => {
            if (action.selfPlantData.mainImageFile) {
              return [
                uploadSelfPlantImage({ treeId: treeId, image: action.selfPlantData.mainImageFile }),
              ];
            } else {
              return [
                sendSelfPlantSuccess(),
                addSuccessMessage({
                  message: {
                    key: 'SELFPLANT_GENERATED',
                    message: this.translateService.instant('selfPlantSuccess'),
                  },
                }),
              ];
            }
          }),
        ),
      ),
    ),
  );

  uploadSelfPlantImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadSelfPlantImage),
      switchMap((action) =>
        this.plantbagService.uploadPlantSelfImage(action.treeId, action.image).pipe(
          switchMap(() => [
            sendSelfPlantSuccess(),
            addSuccessMessage({
              message: {
                key: 'SELFPLANT_GENERATED',
                message: this.translateService.instant('selfPlantSuccess'),
              },
            }),
          ]),
        ),
      ),
    ),
  );
}
