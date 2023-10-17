import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  loadProjectReport,
  selectProjectReport,
  loadProjectProposal,
} from '../../store/project-report.store';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  projectReport$ = this.store.select(selectProjectReport);
  projectReportSub: Subscription;

  showProjectPlanting: boolean = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProjectReport({ projectName: paramMap.get('projectName') }));
    });
    this.projectReportSub = this.projectReport$.subscribe((projectReport) => {
      if (projectReport && projectReport.projectReportData) {
        this.store.dispatch(
          loadProjectProposal({
            amountOfTrees: 5,
            projectName: projectReport.projectReportData.projectName,
          }),
        );
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
  }

  showProjectPlantingComponent() {
    this.showProjectPlanting = true;
  }

  showProjectDescriptionComponent() {
    this.showProjectPlanting = false;
  }
}
