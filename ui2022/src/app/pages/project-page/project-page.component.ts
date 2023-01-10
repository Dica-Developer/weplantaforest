import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadProjectReports,
  ProjectReport,
  selectProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  selectProjectReportsSub: Subscription;
  projectReports$ = this.store.select(selectProjectReports);
  projectReport: ProjectReport;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.store.dispatch(loadProjectReports());
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.projectReports$.subscribe((response) => {
        for (let report of response.content) {
          if (report.projectId === +paramMap.get('id')) {
            this.projectReport = report;
          }
        }
      });
    });
  }
}
