import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deleteTeam, selectIsAdmin, selectIsMember } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-header',
  templateUrl: './team-header.component.html',
  styleUrls: ['./team-header.component.scss'],
})
export class TeamHeaderComponent implements OnInit {
  @Input() teamDetails;
  @Input() profileDetails;
  isAdmin$ = this.store.select(selectIsAdmin);
  isMember$ = this.store.select(selectIsMember);
  createMode = false;
  editMode = false;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  routeToTeam() {
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

  leaveTeam() {}

  deleteTeam() {
    this.store.dispatch(deleteTeam({ teamId: this.teamDetails?.teamId }));
  }

  switchMode(mode: string) {
    if (mode === 'create') {
      this.createMode = !this.createMode;
    } else if (mode === 'edit') {
      this.editMode = !this.editMode;
    }
  }

  closeTeamCreate() {
    this.createMode = false;
    this.editMode = false;
  }
}
