import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { ExplorePageComponent } from './explore-page.component';

@NgModule({
  declarations: [ExplorePageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [],
})
export class ExplorePageModule {}
