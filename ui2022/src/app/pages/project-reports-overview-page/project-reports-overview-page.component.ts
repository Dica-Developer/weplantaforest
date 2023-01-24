import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadProjectReports, selectProjectReports } from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-reports-overview-page',
  templateUrl: './project-reports-overview-page.component.html',
  styleUrls: ['./project-reports-overview-page.component.scss'],
})
export class ProjectReportsOverviewPageComponent implements OnInit {
  type: string = 'all';
  selectProjectReportsSub: Subscription;
  projectReports$ = this.store.select(selectProjectReports);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadProjectReports());
  }

  ngOnInit(): void {}

  setType(event: any) {
    this.type = event;
  }

  // ngOnDestroy() {
  //   this.selectProjectReportsSub.unsubscribe();
  // }
}
