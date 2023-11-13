import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadTeamDetails, selectTeamDetails, getTeamTrees } from '../../store/team.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit, OnDestroy {
  teamDetails$ = this.store.select(selectTeamDetails);
  teamDetailsSub: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(
        loadTeamDetails({ teamName: decodeURIComponent(paramMap.get('teamname')) }),
      );
      this.store.dispatch(
        getTeamTrees({ teamName: decodeURIComponent(paramMap.get('teamname')), page: 0 }),
      );
    });
    this.teamDetailsSub = this.teamDetails$.subscribe((teamDetails) => {
      // if there is a pagereload on the teamPage itself it happens that the teamDetails of the user is loaded
      // so we need to check if the teamDetails are already loaded and if they are not we need to load them
      if (teamDetails) {
        if(teamDetails.teamName !== decodeURIComponent(this.route.snapshot.paramMap.get('teamname'))) {
          this.store.dispatch(
            loadTeamDetails({ teamName: decodeURIComponent(this.route.snapshot.paramMap.get('teamname')) }),
          );
          this.store.dispatch(
            getTeamTrees({ teamName: decodeURIComponent(this.route.snapshot.paramMap.get('teamname')), page: 0 }),
          );
        }
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.teamDetailsSub?.unsubscribe();
  }
}
