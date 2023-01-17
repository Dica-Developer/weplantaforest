import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { RouterModule } from '@angular/router';
import { ProjectReportsOverviewPageComponent } from './project-reports-overview-page.component';

@NgModule({
  declarations: [ProjectReportsOverviewPageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProjectReportsOverviewPageComponent],
})
export class ProjectReportsOverviewModule {}
