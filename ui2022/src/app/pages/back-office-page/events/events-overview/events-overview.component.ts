import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadEvents, EventDetails, selectEventDetails } from '../../../../store/events.store';
import { Subscription } from 'rxjs';
import { loadEventDetailsSuccess } from '../../../../store/events.store';
import { loadActiveProjects } from '../../../../store/project.store';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventGridComponent } from '../event-grid/event-grid.component';
import { MatButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-events-overview',
    templateUrl: './events-overview.component.html',
    styleUrls: ['./events-overview.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        MatButton,
        EventGridComponent,
        NgIf,
        EventDetailsComponent,
    ],
})
export class EventsOverviewComponent implements OnInit, OnDestroy {
  eventDetails: EventDetails;

  eventDetailsSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadActiveProjects());
    this.eventDetailsSub = this.store.select(selectEventDetails).subscribe((res) => {
      this.eventDetails = res;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadEvents());
  }

  ngOnDestroy(): void {
    this.eventDetailsSub.unsubscribe();
  }

  createEvent() {
    const details: EventDetails = {
      id: null,
      name: '',
      team: null,
      user: null,
      codes: [],
    };
    this.store.dispatch(loadEventDetailsSuccess({ details }));
  }
}
