import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ProjectReportDetails } from 'src/app/store/project-report.store';
import {
  loadLatestPlantings,
  loadPartners,
  selectPartners,
  selectPlantings,
} from 'src/app/store/ranking.store';

@Component({
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.component.html',
  styleUrls: ['./project-carousel.component.scss'],
})
export class ProjectCarouselComponent implements OnInit {
  @Input() projectReport: ProjectReportDetails;
  plantings$ = this.store.select(selectPlantings);
  partners$ = this.store.select(selectPartners);
  currentPlantingPage: number;
  currentPartnerPage: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.store.dispatch(
      loadLatestPlantings({
        projectName: this.projectReport?.projectReportData.projectName,
        page: 0,
      }),
    );
    this.currentPlantingPage = 0;
    this.store.dispatch(
      loadPartners({ projectName: this.projectReport?.projectReportData.projectName, page: 0 }),
    );
    this.currentPartnerPage = 0;
  }

  fetchNextPage(type: string, page: number) {
    if (type === 'plantings') {
      this.currentPlantingPage = this.currentPlantingPage + page;
      this.store.dispatch(
        loadLatestPlantings({
          projectName: this.projectReport?.projectReportData.projectName,
          page: this.currentPlantingPage,
        }),
      );
    } else if (type === 'partners') {
      this.currentPartnerPage = this.currentPartnerPage + page;
      this.store.dispatch(
        loadPartners({
          projectName: this.projectReport?.projectReportData.projectName,
          page: this.currentPartnerPage,
        }),
      );
    }
  }
}
