import { Injectable } from '@angular/core';
import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventService } from '../services/event.service';
import { switchMap } from 'rxjs/operators';
import { AppState } from './app.state';

export interface EventGridEntry {
  id: number;
  name: string;
}

export interface EventDetails {
  id: number;
  name: string;
  team: EventTeam;
  user: EventUser;
  codes: EventCode[];
}

export interface EventTeam {
  id: number;
  name: string;
}

export interface EventUser {
  id: number;
  name: string;
}

export interface EventCode {
  id: number;
  code: string;
  cart: EventCart;
}

export interface EventCart {
  id: number;
  cartState: string;
}

export interface EventRequest {
  id: number;
  name: string;
  user: EventUser;
  team: EventTeam;
}

export const loadEvents = createAction('[Events] load events');

export const loadEventsSuccess = createAction(
  '[Content] load events success',
  props<{ events: EventGridEntry[] }>()
);

export const loadEventDetails = createAction(
  '[Events] load eventdetails ',
  props<{ id: number }>()
);

export const loadEventDetailsSuccess = createAction(
  '[Content] load eventdetails success',
  props<{ details: EventDetails }>()
);

export const loadEventCodes = createAction(
  '[Events] load event codes ',
  props<{ id: number }>()
);

export const loadEventCodesSuccess = createAction(
  '[Content] load event codes success',
  props<{ codes: EventCode[] }>()
);

export const updateEvent = createAction(
  '[Content] update event',
  props<{ request: EventRequest }>()
);

export interface EventsState {
  events: EventGridEntry[];
  eventsLoading: boolean;
  details: EventDetails;
}

export const initialState: EventsState = {
  events: [],
  eventsLoading: false,
  details: null,
};

const eventsReducer = createReducer(
  initialState,
  on(loadEvents, (state) => ({
    ...state,
    eventsLoading: true,
  })),
  on(loadEventsSuccess, (state, { events }) => ({
    ...state,
    events,
    eventsLoading: false,
  })),
  on(loadEventDetailsSuccess, (state, { details }) => ({
    ...state,
    details,
  })),
  on(loadEventCodesSuccess, (state, { codes }) => ({
    ...state,
    details: {
      ...state.details,
      codes,
    },
  }))
);

export function eventsReducerFn(state, action) {
  return eventsReducer(state, action);
}

export const eventsFeature = (state: AppState) => state.event;

export const selectEvents = createSelector(
  eventsFeature,
  (state: EventsState) => state.events
);

export const selectEventsLoading = createSelector(
  eventsFeature,
  (state: EventsState) => state.eventsLoading
);

export const selectEventDetails = createSelector(
  eventsFeature,
  (state: EventsState) => state.details
);

@Injectable()
export class EventsEffects {
  constructor(private actions$: Actions, private eventService: EventService) {}

  LoadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      switchMap((action) =>
        this.eventService
          .loadEvents()
          .pipe(
            switchMap((events: EventGridEntry[]) => [
              loadEventsSuccess({ events }),
            ])
          )
      )
    )
  );

  LoadEventDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventDetails),
      switchMap((action) =>
        this.eventService
          .loadEvent(action.id)
          .pipe(
            switchMap((details: EventDetails) => [
              loadEventDetailsSuccess({ details }),
              loadEventCodes({ id: action.id }),
            ])
          )
      )
    )
  );

  LoadEventCodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventCodes),
      switchMap((action) =>
        this.eventService
          .loadEventCodes(action.id)
          .pipe(
            switchMap((codes: EventCode[]) => [
              loadEventCodesSuccess({ codes }),
            ])
          )
      )
    )
  );

  UpdateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEvent),
      switchMap((action) =>
        this.eventService
          .save(action.request)
          .pipe(
            switchMap((details: EventDetails) => [
              loadEventDetailsSuccess({ details }),
              loadEventCodes({ id: details.id }),
            ])
          )
      )
    )
  );
}
