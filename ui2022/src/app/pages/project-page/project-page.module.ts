import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import { ProjectPageComponent } from './project-page.component';
import { ProjectFeedComponent } from './components/project-feed/project-feed.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectCarouselComponent } from './components/project-carousel/project-carousel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectDescriptionComponent,
    ProjectFeedComponent,
    ProjectHeaderComponent,
    ProjectCarouselComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProjectPageComponent],
})
export class ProjectPageModule {}
