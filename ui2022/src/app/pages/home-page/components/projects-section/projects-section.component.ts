import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Subscription } from 'rxjs';
import {
    ProjectReport,
  loadActiveProjectReports,
  selectActiveProjectReports,
} from 'src/app/store/project-report.store';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { ProjectTileComponent } from '../../../../util/common-components/project-tile/project-tile.component';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { CircleIconComponent } from '../../../../util/common-components/icons/circle-icon/circle-icon.component';
import { LeafletMapComponent } from '../../../../util/common-components/leaflet-map/leaflet-map.component';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
  standalone: true,
  imports: [
    LeafletMapComponent,
    CircleIconComponent,
    NgFor,
    ProjectTileComponent,
    ButtonComponent,
    RouterLink,
    AsyncPipe,
    TranslateModule,
    CommonModule
  ],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  projectReports$ = this.store.select(selectActiveProjectReports);
  mapHeight: string = '768px';
  screenWidth: number;

  projectReportSub: Subscription;

  projectAreas: any[][] = [];
  isBrowser: boolean;

  constructor(private store: Store<AppState>,
    private platformHelper: PlatformHelper
  ) {
    this.store.dispatch(loadActiveProjectReports());
    this.getScreenSize();
  }

  @HostListener('window:load', ['$event'])
  getScreenSize() {
    if (this.platformHelper.checkIfBrowser()) {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.isBrowser = this.platformHelper.checkIfBrowser();
    if (this.screenWidth < 764) {
      this.mapHeight = '500px';
    }

    this.projectReportSub = this.projectReports$.subscribe((reports) => {
      this.projectAreas = this.createProjectAreas(reports);
    });
  }

  createProjectAreas(projectReports: ProjectReport[]) {
    const areas = [];
    if (projectReports.length > 0) {
      for (let project of projectReports) {
        if (project.positions && project.positions.length > 0) {
          areas.push(project.positions);
        }
      }
    }
    return areas;
  }

  ngOnDestroy(): void {
    this.projectReportSub?.unsubscribe();
  }
}
