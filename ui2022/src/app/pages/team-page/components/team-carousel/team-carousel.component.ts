import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TeamDetails } from 'src/app/store/team.store';
import { loadTeamMember, selectTeamMembers } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-carousel',
  templateUrl: './team-carousel.component.html',
  styleUrls: ['./team-carousel.component.scss'],
})
export class TeamCarouselComponent implements OnInit {
  @Input() teamDetails: TeamDetails;
  teamMembers$ = this.store.select(selectTeamMembers);
  currentMemberPage: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.currentMemberPage = 1;
    this.store.dispatch(
      loadTeamMember({
        teamName: this.teamDetails?.teamName,
        page: this.currentMemberPage,
      }),
    );
  }

  fetchNextPage(page: number) {
    this.currentMemberPage = this.currentMemberPage + page;
    this.store.dispatch(
      loadTeamMember({
        teamName: this.teamDetails?.teamName,
        page: this.currentMemberPage,
      }),
    );
  }
}
