import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadActiveProjectReports,
  selectActiveProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit {
  selectProjectReportsSub: Subscription;
  projectReports$ = this.store.select(selectActiveProjectReports);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadActiveProjectReports());
  }

  ngOnInit(): void {}
}
