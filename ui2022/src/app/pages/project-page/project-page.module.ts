import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { ProjectPageComponent } from './project-page.component';
import { ProjectFeedComponent } from './components/project-feed/project-feed.component';
import { ProjectCarouselComponent } from './components/project-carousel/project-carousel.component';
import { RouterModule } from '@angular/router';
import { ProjectCarouselItemComponent } from './components/project-carousel-item/project-carousel-item.component';
import { ProjectPlantingComponent } from './components/project-planting/project-planting.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectFeedComponent,
    ProjectCarouselComponent,
    ProjectCarouselItemComponent,
    ProjectPlantingComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule, NgxSliderModule],
  exports: [ProjectPageComponent],
})
export class ProjectPageModule {}
