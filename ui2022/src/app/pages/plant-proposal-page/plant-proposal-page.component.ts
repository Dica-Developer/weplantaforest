import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getSimplePlantProposal, selectProposalPrice, selectSimpleProposal } from 'src/app/store/plant.store';
import { Options } from '@angular-slider/ngx-slider';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plant-proposal-page',
  templateUrl: './plant-proposal-page.component.html',
  styleUrls: ['./plant-proposal-page.component.scss'],
})
export class PlantProposalPageComponent implements OnInit {
  value: number = 5;

  simpleProposal$;

  proposalPrice$ = this.store.select(selectProposalPrice);

  sliderOptions: Options = {
   stepsArray: [
      { value: 1, legend: `1 ${this.translateService.instant('tree')}` },
      { value: 5, legend: `5 ${this.translateService.instant('trees')}` },
      { value: 10, legend: `10 ${this.translateService.instant('trees')}` },
      { value: 50, legend: `50 ${this.translateService.instant('trees')}` },
      { value: 100, legend: `100 ${this.translateService.instant('trees')}` },
    ],
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  constructor(private store: Store<AppState>, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: 5 }));
    this.simpleProposal$ = this.store.select(selectSimpleProposal);
  }

  getProposal(event) {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: event }));
  }

  putIntoPlantbag() {
    
  }
}
