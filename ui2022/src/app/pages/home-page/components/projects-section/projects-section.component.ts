import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Subscription, take } from 'rxjs';
import {
  ProjectReportData,
  loadActiveProjectReports,
  selectActiveProjectReports,
  // selectProjectDetailsObservableArray,
} from 'src/app/store/project-report.store';
import { ProjectReportService } from 'src/app/services/project-report.service';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  projectReports$ = this.store.select(selectActiveProjectReports);
  // projectReportDetailsArray$ = this.store.select(selectProjectDetailsObservableArray);
  mapHeight: string = '768px';
  screenWidth;
  projectReportSub: Subscription;
  projectAreas: any[][] = [];
  projectNames: string[] = [];
  projectReportDataArray: any[] = [];

  constructor(private store: Store<AppState>, private projectReportService: ProjectReportService) {
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
          console.log(project);
          areas.push(project.positions);
          this.projectNames.push(project.projectReportData.projectName);
        }
      }
      this.projectAreas = areas;
      if (this.projectNames.length > 0) {
        this.loadProjectDetailsArray();
      }
    });
  }

  loadProjectDetailsArray() {
    for (let name of this.projectNames) {
      this.projectReportService
        .loadProjectReport(name)
        .pipe(take(1))
        .subscribe((report: ProjectReportData) => {
          this.projectReportDataArray.push(report);
        });
    }
  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
  }
}
