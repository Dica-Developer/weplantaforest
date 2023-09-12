import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PlantSelfPageComponent } from './plant-self-page.component';

@NgModule({
  declarations: [PlantSelfPageComponent],
  imports: [CommonModule, UtilModule, RouterModule, NgxSliderModule],
})
export class PlantSelfPageModule {}
