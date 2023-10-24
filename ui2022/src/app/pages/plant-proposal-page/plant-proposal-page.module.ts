import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { PlantProposalPageComponent } from './plant-proposal-page.component';
import { PlantProposalRowComponent } from './components/plant-proposal-row/plant-proposal-row.component';
import { SelfPlantRowComponent } from './components/self-plant-row/self-plant-row.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    PlantProposalPageComponent,
    PlantProposalRowComponent,
    SelfPlantRowComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule, NgxSliderModule],
})
export class PlantProposalPageModule {}
