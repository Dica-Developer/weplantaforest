import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadProfileDetails, selectProfileDetails } from 'src/app/store/profile.store';
import { selectActiveProjectReports } from 'src/app/store/project-report.store';
import { loadTeamDetails, selectTeamDetails } from 'src/app/store/team.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectProjectReportsSub: Subscription;
  profileDetails$ = this.store.select(selectProfileDetails);
  plantings$ = this.store.select(selectActiveProjectReports);
  teamDetails$ = this.store.select(selectTeamDetails);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
    });
  }

  ngOnInit(): void {}
}