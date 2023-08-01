import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { TeamPageComponent } from './team-page.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { TeamCarouselItemComponent } from './components/team-carousel-item/team-carousel-item.component';
import { TeamCarouselComponent } from './components/team-carousel/team-carousel.component';

@NgModule({
  declarations: [TeamPageComponent, TeamInfoComponent, TeamCarouselItemComponent, TeamCarouselComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [TeamPageComponent],
})
export class TeamPageModule {}
