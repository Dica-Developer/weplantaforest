import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { PlantProposalPageComponent } from './plant-proposal-page.component';
import { CustomPlantingComponent } from './components/custom-planting/custom-planting.component';
import { PlantProposalRowComponent } from './components/plant-proposal-row/plant-proposal-row.component';
import { SelfPlantRowComponent } from './components/self-plant-row/self-plant-row.component';

@NgModule({
  declarations: [
    PlantProposalPageComponent,
    CustomPlantingComponent,
    PlantProposalRowComponent,
    SelfPlantRowComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
})
export class PlantProposalPageModule {}
