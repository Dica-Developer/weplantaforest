import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { TeamPageComponent } from './team-page.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';

@NgModule({
  declarations: [TeamPageComponent, TeamInfoComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [TeamPageComponent],
})
export class TeamPageModule {}
