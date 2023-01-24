import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { RouterModule } from '@angular/router';
import { ProjectReportsOverviewPageComponent } from './project-reports-overview-page.component';
import { ProjectReportsHeaderComponent } from './components/project-reports-header/project-reports-header.component';
import { ProjectOverviewTileComponent } from './components/project-overview-tile/project-overview-tile.component';

@NgModule({
  declarations: [ProjectReportsOverviewPageComponent, ProjectReportsHeaderComponent, ProjectOverviewTileComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProjectReportsOverviewPageComponent],
})
export class ProjectReportsOverviewModule {}
