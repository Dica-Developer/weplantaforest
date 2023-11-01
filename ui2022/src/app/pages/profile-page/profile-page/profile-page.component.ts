import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loadProfileDetails, selectProfileDetails } from '../../../store/profile.store';
import { Subscription } from 'rxjs';
import {
  checkIfMember,
  loadTeamDetails,
  selectTeamDetails,
  loadTeamDetailsSuccess,
  resetTeamDetails,
} from '../../../store/team.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, AfterViewInit, OnDestroy {
  profileDetails$ = this.store.select(selectProfileDetails);
  showEdit: boolean = false;
  profileDetailsSub: Subscription;
  teamDetails$ = this.store.select(selectTeamDetails);
  routeParamsSub: Subscription;
  teamDetailsSub: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));

      if (paramMap.get('username') === localStorage.getItem('username')) {
        this.showEdit = true;
      } else {
        this.showEdit = false;
      }
    });

    this.profileDetailsSub = this.profileDetails$.subscribe((profileDetails) => {
      if (profileDetails && profileDetails.teamName) {
        this.store.dispatch(loadTeamDetails({ teamName: profileDetails.teamName }));
      } else {
        this.store.dispatch(resetTeamDetails());
      }
    });
    this.teamDetailsSub = this.teamDetails$.subscribe((teamDetails) => {
      if (teamDetails) {
        this.store.dispatch(checkIfMember({ teamId: teamDetails.teamId }));
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.profileDetailsSub?.unsubscribe();
    this.routeParamsSub?.unsubscribe();
    this.teamDetailsSub?.unsubscribe();
  }
}
