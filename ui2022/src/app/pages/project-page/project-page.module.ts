import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { ProjectPageComponent } from './project-page.component';
import { ProjectFeedComponent } from './components/project-feed/project-feed.component';
import { ProjectCarouselComponent } from './components/project-carousel/project-carousel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectFeedComponent,
    ProjectCarouselComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProjectPageComponent],
})
export class ProjectPageModule {}
