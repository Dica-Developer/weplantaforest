import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OfferAreaComponent } from '../../util/common-components/offer-area/offer-area.component';
import { SelfPlantRowComponent } from './components/self-plant-row/self-plant-row.component';
import { CustomPlantingComponent } from './components/custom-planting/custom-planting.component';
import { PlantProposalRowComponent } from './components/plant-proposal-row/plant-proposal-row.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
    selector: 'app-plant-proposal-page',
    templateUrl: './plant-proposal-page.component.html',
    styleUrls: ['./plant-proposal-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        MatTabGroup,
        MatTab,
        PlantProposalRowComponent,
        CustomPlantingComponent,
        SelfPlantRowComponent,
        OfferAreaComponent,
        TranslateModule,
    ],
})
export class PlantProposalPageComponent implements OnInit {
  constructor(private platformHelper: PlatformHelper) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
  }
}
