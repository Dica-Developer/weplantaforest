import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deleteTeam } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-header',
  templateUrl: './team-header.component.html',
  styleUrls: ['./team-header.component.scss'],
})
export class TeamHeaderComponent implements OnInit {
  @Input() teamDetails;
  @Input() profileDetails;
  @Input() showEdit;
  isCreatingTeam = false;
  isAdmin = true;
  isMember = true;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  routeToTeam() {
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

  editTeam() {}

  deleteTeam() {
    this.store.dispatch(deleteTeam({ teamId: this.teamDetails?.teamId }));
  }

  toggleCreatingTeam() {
    this.isCreatingTeam = !this.isCreatingTeam;
  }
}
