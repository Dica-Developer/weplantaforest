import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Subscription } from 'rxjs';
import {
  EventDetails,
  selectEventDetails,
  EventRequest,
} from '../../../store/events.store';
import { User, selectUsers, loadUsers } from '../../../store/user.store';
import { Team, selectTeams, loadTeams } from '../../../store/team.store';
import { updateEvent, createEvent } from '../../../store/events.store';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  eventForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    teamId: new FormControl(null),
    teamName: new FormControl(null),
    userId: new FormControl(null),
    userName: new FormControl(null),
  });

  eventDetailsSub: Subscription;
  eventDetails: EventDetails;

  allUsers: User[];
  allUsersSub: Subscription;
  filteredOptions: User[];
  filterControl = new FormControl('');
  filterControlVCSub: Subscription;

  allTeams: Team[];
  allTeamsSub: Subscription;
  teamFilteredOptions: Team[];
  teamFilterControl = new FormControl('');
  teamFilterControlVCSub: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.eventDetailsSub = this.store
      .select(selectEventDetails)
      .subscribe((res) => {
        this.eventDetails = res;
        if (this.eventDetails) {
          this.initForm(this.eventDetails);
        }
      });

    this.allUsersSub = this.store.select(selectUsers).subscribe((res) => {
      this.allUsers = res;
      if (this.allUsers.length == 0) {
        this.store.dispatch(loadUsers());
      }
    });

    this.allTeamsSub = this.store.select(selectTeams).subscribe((res) => {
      this.allTeams = res;
      if (this.allTeams.length == 0) {
        this.store.dispatch(loadTeams());
      }
    });
  }

  ngOnInit(): void {
    this.filterControlVCSub = this.filterControl.valueChanges.subscribe(
      (res) => {
        // if user object selected, set name as control value and id for eventForm userId value
        if (res?.id) {
          this.filterControl.setValue(res.name);
          this.eventForm.get('userId').setValue(res.id);
          this.eventForm.get('userName').setValue(res.name);
        } else {
          // if value is string --> filter options
          this.filteredOptions = this._filter(res);
        }
      }
    );

    this.teamFilterControlVCSub = this.teamFilterControl.valueChanges.subscribe(
      (res) => {
        if (res?.id) {
          this.teamFilterControl.setValue(res.name);
          this.eventForm.get('teamId').setValue(res.id);
          this.eventForm.get('teamName').setValue(res.name);
        } else {
          this.teamFilteredOptions = this._filterTeams(res);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.eventDetailsSub.unsubscribe();
    this.allUsersSub.unsubscribe();
    this.filterControlVCSub.unsubscribe();
    this.allTeamsSub.unsubscribe();
    this.teamFilterControlVCSub.unsubscribe();
  }

  initForm(details: EventDetails) {
    this.eventForm.get('id').setValue(details.id);
    this.eventForm.get('name').setValue(details.name);
    this.eventForm.get('teamId').setValue(details.team?.id);
    this.eventForm.get('userId').setValue(details.user?.id);
    if (details.user) {
      this.filterControl.setValue(details.user?.name);
    }else {
      this.filterControl.setValue('');
    }
    if (details.team) {
      this.teamFilterControl.setValue(details.team?.name);
    } else {
      this.teamFilterControl.setValue('');
    }
  }

  saveEvent() {
    const eventTeam = this.eventForm.get('teamId').value
      ? {
          id: this.eventForm.get('teamId').value,
          name: this.eventForm.get('teamName').value,
        }
      : null;
    const eventUser = this.eventForm.get('userId').value
      ? {
          id: this.eventForm.get('userId').value,
          name: this.eventForm.get('userName').value,
        }
      : null;
    const request: EventRequest = {
      id: this.eventForm.get('id').value,
      name: this.eventForm.get('name').value,
      user: eventUser,
      team: eventTeam,
    };
    if (request.id) {
      this.store.dispatch(updateEvent({ request }));
    } else {
      this.store.dispatch(createEvent({ request }));
    }
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterTeams(value: string): Team[] {
    const filterValue = value.toLowerCase();
    return this.allTeams.filter((team) =>
      team.name.toLowerCase().includes(filterValue)
    );
  }

  removeUser() {
    this.filterControl.setValue('');
    this.eventForm.get('userId').setValue(null);
    this.eventForm.get('userName').setValue(null);
  }

  removeTeam() {
    this.teamFilterControl.setValue('');
    this.eventForm.get('teamId').setValue(null);
    this.eventForm.get('teamName').setValue(null);
  }
}
