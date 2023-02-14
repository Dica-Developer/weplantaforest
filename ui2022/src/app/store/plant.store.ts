import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { PlantbagService } from '../services/plantbag.service';
import { AppState } from './app.state';
import { initialState } from './error.state';

export const getSimplePlantProposal = createAction(
  '[Plant] get proposal',
  props<{ amountOfTrees: number }>(),
);

export const getSimplePlantProposalSuccess = createAction(
  '[Plant] get proposal success',
  props<{ simpleProposal: SimplePlantProposal }>(),
);

export interface PlantProposalItem {
  amount: number;
  imageFile: string;
  projectName: string;
  treePrice: number;
  treeType: string;
}

export interface SimplePlantProposal {
  actualAmountOfTrees: number;
  actualPrice: number;
  plantItems: PlantProposalItem[];
  targetAmountOfTrees: number;
}

export interface PlantProposalState {
  simpleProposal: SimplePlantProposal;
}

export const intialState: PlantProposalState = {
  simpleProposal: null,
};

const plantProposalReducer = createReducer(
  initialState,
  on(getSimplePlantProposalSuccess, (state, action) => ({
    ...state,
    simpleProposal: action.simpleProposal,
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

@Injectable()
export class PlantProposalEffects {
  constructor(private actions$: Actions, private plantbagService: PlantbagService) {}

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
}
