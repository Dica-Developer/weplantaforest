import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadEvents, EventDetails, selectEventDetails } from '../../../../store/events.store';
import { Subscription } from 'rxjs';
import { loadEventDetailsSuccess } from '../../../../store/events.store';
import { selectActiveProjects, loadActiveProjects } from '../../../../store/project.store';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss'],
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
