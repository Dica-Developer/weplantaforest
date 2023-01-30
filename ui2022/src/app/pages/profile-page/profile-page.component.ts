import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadProfileDetails, selectProfileDetails } from 'src/app/store/profile.store';
import { selectActiveProjectReports } from 'src/app/store/project-report.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectProjectReportsSub: Subscription;
  profileDetails$ = this.store.select(selectProfileDetails);
  teamDetails$ = this.store.select(selectProfileDetails);
  plantings$ = this.store.select(selectActiveProjectReports);
  plantings: any[] = [
    { name: 'name', amount: 2 },
    { name: 'fiehra', amount: 21 },
    { name: 'amount', amount: 23 },
    { name: 'ring', amount: 22 },
    { name: 'name', amount: 2 },
    { name: 'fiehra', amount: 21 },
    { name: 'amount', amount: 23 },
    { name: 'ring', amount: 22 },
  ];
  // teamDetails$ = this.store.select(selectTeamDetails);
  // plantings$ = this.store.select(selectPlantings);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
    });
  }

  ngOnInit(): void {
    this.profileDetails$.subscribe((res) => {
      console.log(res);
    });
    console.log(this.plantings);
  }
}
