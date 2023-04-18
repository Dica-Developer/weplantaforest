import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { ExplorePageComponent } from './explore-page.component';
import { MaterialModule } from 'src/app/util/material/material.module';

@NgModule({
  declarations: [ExplorePageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ExplorePageComponent],
})
export class ExplorePageModule {}
