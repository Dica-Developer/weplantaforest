import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Subscription } from 'rxjs';
import { EventDetails, selectEventDetails } from '../../../store/events.store';
import { User, selectUsers, loadUsers } from '../../../store/user.store';
import { Team, selectTeams, loadTeams } from '../../../store/team.store';

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
    userId: new FormControl(null),
  });

  eventDetailsSub: Subscription;
  eventDetails: EventDetails;

  allUsers: User[];
  allUsersSub: Subscription;
  filteredOptions: User[];
  filterControl = new FormControl();
  filterControlVCSub: Subscription;

  allTeams: Team[];
  allTeamsSub: Subscription;
  teamFilteredOptions: Team[];
  teamFilterControl = new FormControl();
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
      console.log('teams: ', res);

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
    this.filterControl.setValue(details.user?.name);
    this.teamFilterControl.setValue(details.team?.name);
  }

  saveEvent() {}

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
}
