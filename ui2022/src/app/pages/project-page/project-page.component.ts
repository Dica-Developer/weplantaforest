import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.state';
import {
  loadProjectReport,
  selectProjectReport,
  loadProjectProposal,
  ProjectReport,
  ProjectReportData,
  ProjectReportDetails,
} from '../../store/project-report.store';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { LeafletMapComponent } from '../../util/common-components/leaflet-map/leaflet-map.component';
import { ProjectCarouselComponent } from './components/project-carousel/project-carousel.component';
import { ProjectPlantingComponent } from './components/project-planting/project-planting.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { SafeHtmlPipe } from 'src/app/util/common-components/safehtml.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';

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
    TranslateModule,
    SafeHtmlPipe
  ],
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  projectReport$ = this.store.select(selectProjectReport);
  projectReportSub: Subscription;
  showProjectPlanting: boolean = false;
  routeParamsSub: Subscription;
  description: string;
  images: { imageUrl: string; caption: string }[] = [];

  constructor(private store: Store<AppState>,
    private route: ActivatedRoute,
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProjectReport({ projectName: paramMap.get('projectName') }));
      this.projectReportSub = this.projectReport$.subscribe((projectReport) => {
        if (projectReport && projectReport.projectReportData) {
          console.log(projectReport.projectReportData.active)
          console.log(projectReport.projectReportData.projectName)
          this.store.dispatch(
            loadProjectProposal({
              amountOfTrees: 5,
              projectName: projectReport.projectReportData.projectName,
            }),
          );
          this.initProject(projectReport)
        }
      });
    });
    this.platformHelper.scrollTop()
  }


  initProject(projectReport: ProjectReportDetails) {
    console.log(this.images)
    this.images = []
    for (let image of projectReport.images) {
      let url =
        environment.backendUrl + '/project/image/' + encodeURI(image.imageFileName) + '/2000/1000';
      let caption = this.textHelper.getTextForLanguage(
        image.description,
        this.translateService.currentLang,
      );
      this.images.unshift({ imageUrl: url, caption });
      console.log(this.images)
    }
    this.description = this.textHelper.getTextForLanguage(
      projectReport.projectReportData.description,
      this.translateService.currentLang,
    );

    console.log(this.description)

  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
    this.projectReportSub?.unsubscribe();
  }

  showProjectPlantingComponent() {
    this.showProjectPlanting = true;
    this.platformHelper.scrollTop()
  }

  showProjectDescriptionComponent() {
    this.showProjectPlanting = false;
  }
}
