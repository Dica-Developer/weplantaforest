import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadTeamDetails, selectTeamDetails, getTeamTrees } from '../../store/team.store';
import { Subscription } from 'rxjs';
import { NewsletterComponent } from '../../util/common-components/newsletter/newsletter.component';
import { TeamCarouselComponent } from './components/team-carousel/team-carousel.component';
import { TeamTreesComponent } from './components/team-trees/team-trees.component';
import { TeamDetailsComponent } from '../../util/common-components/team-details/team-details.component';
import { TeamHeaderComponent } from '../../util/common-components/team-header/team-header.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        TeamHeaderComponent,
        TeamDetailsComponent,
        TeamTreesComponent,
        TeamCarouselComponent,
        NewsletterComponent,
        AsyncPipe,
    ],
})
export class TeamPageComponent implements OnInit, OnDestroy {
  teamDetails$ = this.store.select(selectTeamDetails);
  teamDetailsSub: Subscription;
  routeParamsSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>,
    private route: ActivatedRoute) {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
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
    this.platformHelper.scrollTop()
  }

  ngOnDestroy(): void {
    this.teamDetailsSub?.unsubscribe();
    this.routeParamsSub?.unsubscribe();
  }
}
