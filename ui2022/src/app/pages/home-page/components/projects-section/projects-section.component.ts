import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Subscription } from 'rxjs';
import {
  loadActiveProjectReports,
  selectActiveProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  projectReports$ = this.store.select(selectActiveProjectReports);
  mapHeight: string = '768px';
  screenWidth;

  projectReportSub: Subscription;

  projectAreas: any[][] = [];

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadActiveProjectReports());
    this.getScreenSize();
  }

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.screenWidth < 764) {
      this.mapHeight = '500px';
    }

    this.projectReportSub = this.projectReports$.subscribe((reports) => {
      const areas = [];
      if (reports.length > 0) {
        for (let project of reports) {
          areas.push(project.positions);
        }
      }
      this.projectAreas = areas;
    });
  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
  }
}
