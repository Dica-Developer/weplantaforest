import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { AppState } from './app.state';

export interface AppSuccessMessage {
  key: string;
  message: string;
}

export const addSuccessMessage = createAction(
  '[Success message] add',
  props<{ message: AppSuccessMessage }>()
);

export const removeSuccessMessage = createAction(
  '[Success message] remove',
  props<{ key: string }>()
);

export interface SuccessMessageState {
  messages: AppSuccessMessage[];
}

export const initialState: SuccessMessageState = {
  messages: [],
};

const successMessageReducer = createReducer(
  initialState,
  on(addSuccessMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(removeSuccessMessage, (state, { key }) => ({
    ...state,
    messages: state.messages.filter((el) => el.key != key),
  }))
);

export function successMessageReducerFn(state, action) {
  return successMessageReducer(state, action);
}

export const successMessageFeature = (state: AppState) => state.successMessagesState;

export const selectSuccessMessages = createSelector(
  successMessageFeature,
  (state: SuccessMessageState) => state.messages
);
