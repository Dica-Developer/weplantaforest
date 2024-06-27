import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loadProfileDetails, selectProfileDetails } from '../../../store/profile.store';
import { Subscription } from 'rxjs';
import {
  checkIfMember,
  loadTeamDetails,
  selectTeamDetails,
  resetTeamDetails,
} from '../../../store/team.store';
import { TranslateModule } from '@ngx-translate/core';
import { NewsletterComponent } from '../../../util/common-components/newsletter/newsletter.component';
import { ProfileWidgetsComponent } from '../components/profile-widgets/profile-widgets.component';
import { ProfileCertificatesComponent } from '../components/profile-certificates/profile-certificates.component';
import { ProfileGiftOverviewComponent } from '../components/profile-gift-overview/profile-gift-overview.component';
import { ProfileReceiptsComponent } from '../components/profile-receipts/profile-receipts.component';
import { ProfileTreesComponent } from '../components/profile-trees/profile-trees.component';
import { TeamDetailsComponent } from '../../../util/common-components/team-details/team-details.component';
import { ProfileDetailsComponent } from '../components/profile-details/profile-details.component';
import { TeamHeaderComponent } from '../../../util/common-components/team-header/team-header.component';
import { ProfileHeaderComponent } from '../components/profile-header/profile-header.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ProfileHeaderComponent,
    TeamHeaderComponent,
    ProfileDetailsComponent,
    TeamDetailsComponent,
    ProfileTreesComponent,
    ProfileReceiptsComponent,
    ProfileGiftOverviewComponent,
    ProfileCertificatesComponent,
    ProfileWidgetsComponent,
    NewsletterComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ProfilePageComponent implements OnInit, AfterViewInit, OnDestroy {
  profileDetails$ = this.store.select(selectProfileDetails);
  showEdit: boolean = false;
  profileDetailsSub: Subscription;
  teamDetails$ = this.store.select(selectTeamDetails);
  routeParamsSub: Subscription;
  teamDetailsSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
    private route: ActivatedRoute) {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(
        loadProfileDetails({ username: decodeURIComponent(paramMap.get('username')) }),
      );

      if (paramMap.get('username') === this.platformHelper.getLocalstorage('username')) {
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
    this.platformHelper.scrollTop()
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.profileDetailsSub?.unsubscribe();
    this.routeParamsSub?.unsubscribe();
    this.teamDetailsSub?.unsubscribe();
  }
}
