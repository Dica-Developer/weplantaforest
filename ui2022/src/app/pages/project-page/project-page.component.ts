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
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { LeafletMapComponent } from '../../util/common-components/leaflet-map/leaflet-map.component';
import { ProjectCarouselComponent } from './components/project-carousel/project-carousel.component';
import { ProjectPlantingComponent } from './components/project-planting/project-planting.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ProjectHeaderComponent,
    ProjectDescriptionComponent,
    ProjectPlantingComponent,
    ProjectCarouselComponent,
    LeafletMapComponent,
    OfferAreaComponent,
    AsyncPipe,
  ],
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  projectReport$ = this.store.select(selectProjectReport);
  projectReportSub: Subscription;
  showProjectPlanting: boolean = false;
  routeParamsSub: Subscription;

  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private platformHelper: PlatformHelper
  ) {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
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
    this.platformHelper.scrollTop()
  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
    this.routeParamsSub?.unsubscribe();
  }

  showProjectPlantingComponent() {
    this.showProjectPlanting = true;
  }

  showProjectDescriptionComponent() {
    this.showProjectPlanting = false;
  }
}
