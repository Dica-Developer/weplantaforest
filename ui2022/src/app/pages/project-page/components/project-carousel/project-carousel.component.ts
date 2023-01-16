import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RankingService } from 'src/app/services/ranking.service';
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

  constructor(private store: Store<AppState>, private rankingsService: RankingService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.store.dispatch(
      loadLatestPlantings({ projectName: this.projectReport?.projectReportData.projectName }),
    );
    this.store.dispatch(
      loadPartners({ projectName: this.projectReport?.projectReportData.projectName }),
    );
  }
}
