import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadActiveProjectReports,
  loadInActiveProjectReports,
  loadProjectReports,
  selectActiveProjectReports,
  selectInActiveProjectReports,
  selectProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-reports-overview-page',
  templateUrl: './project-reports-overview-page.component.html',
  styleUrls: ['./project-reports-overview-page.component.scss'],
})
export class ProjectReportsOverviewPageComponent implements OnInit {
  type: string = 'all';
  selectProjectReportsSub: Subscription;
  activeProjectReports$ = this.store.select(selectActiveProjectReports);
  inactiveProjectReports$ = this.store.select(selectInActiveProjectReports);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadInActiveProjectReports());
    this.store.dispatch(loadActiveProjectReports());
  }

  ngOnInit(): void {}

  setType(event: any) {
    this.type = event;
  }

  // ngOnDestroy() {
  //   this.selectProjectReportsSub.unsubscribe();
  // }
}
