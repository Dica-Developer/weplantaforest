import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadProjectReports, selectProjectReports } from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  selectProjectReportsSub: Subscription;
  projectReports$ = this.store.select(selectProjectReports);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadProjectReports());
  }

  ngOnInit(): void {}
}
