import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadActiveProjectReports,
  loadInActiveProjectReports,
  selectActiveProjectReports,
  selectAmountOfInactiveProjects,
  selectInActiveProjectReports,
} from 'src/app/store/project-report.store';
import { TranslateModule } from '@ngx-translate/core';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { NewsletterComponent } from '../../util/common-components/newsletter/newsletter.component';
import { MatIcon } from '@angular/material/icon';
import { ProjectOverviewTileComponent } from './components/project-overview-tile/project-overview-tile.component';
import { ProjectReportsHeaderComponent } from './components/project-reports-header/project-reports-header.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-project-reports-overview-page',
  templateUrl: './project-reports-overview-page.component.html',
  styleUrls: ['./project-reports-overview-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ProjectReportsHeaderComponent,
    NgFor,
    ProjectOverviewTileComponent,
    MatIcon,
    NewsletterComponent,
    OfferAreaComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class ProjectReportsOverviewPageComponent implements OnInit, OnDestroy {
  type: string = 'active';
  activeProjectReports$ = this.store.select(selectActiveProjectReports);
  inactiveProjectReports$ = this.store.select(selectInActiveProjectReports);

  amountOfInactiveProjects: number;
  inactiveAmountOfProjectsSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>) {
    this.store.dispatch(loadInActiveProjectReports({ pageSize: 8 }));
    this.store.dispatch(loadActiveProjectReports());
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.inactiveAmountOfProjectsSub = this.store
      .select(selectAmountOfInactiveProjects)
      .subscribe((res) => {
        this.amountOfInactiveProjects = res;
      });
  }

  setType(event: any) {
    this.type = event;
  }

  loadAllInactiveProjects() {
    this.store.dispatch(loadInActiveProjectReports({ pageSize: this.amountOfInactiveProjects }));
  }

  ngOnDestroy(): void {
    this.inactiveAmountOfProjectsSub?.unsubscribe();
  }
}
