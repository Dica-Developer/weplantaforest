import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TeamDetails } from 'src/app/store/team.store';
import { loadTeamMember, selectTeamMembers } from 'src/app/store/team.store';
import { TranslateModule } from '@ngx-translate/core';
import { TeamCarouselItemComponent } from '../team-carousel-item/team-carousel-item.component';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-team-carousel',
    templateUrl: './team-carousel.component.html',
    styleUrls: ['./team-carousel.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatIcon,
        NgFor,
        TeamCarouselItemComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class TeamCarouselComponent implements OnInit {
  @Input() teamDetails: TeamDetails;
  teamMembers$ = this.store.select(selectTeamMembers);
  currentMemberPage: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {}

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
