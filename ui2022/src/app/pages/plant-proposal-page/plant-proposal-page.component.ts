import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  getProjectsForCustomPlanting,
  getSimplePlantProposal,
  selectProjectsForCustomPlanting,
  selectProposalPrice,
  selectSimpleProposal,
} from '../../store/plant.store';
import { Options } from '@angular-slider/ngx-slider';
import { TranslateService } from '@ngx-translate/core';
import { loadActiveProjects, selectActiveProjects } from '../../store/project.store';
import { Observable, Subscription } from 'rxjs';
import { addPlantbagItem, resetPlantbag } from '../../store/plantbag.store';
import { SliderHelper } from '../../util/helper/slider.helper';

@Component({
  selector: 'app-plant-proposal-page',
  templateUrl: './plant-proposal-page.component.html',
  styleUrls: ['./plant-proposal-page.component.scss'],
})
export class PlantProposalPageComponent implements OnInit, OnDestroy {
  value: number = 5;

  simpleProposal;
  activeProjects;
  proposalSub: Subscription;
  activeProjectsSub: Subscription;

  proposalPrice$ = this.store.select(selectProposalPrice);
  activeProjects$: Observable<any>;

  sliderOptions: Options = {
    stepsArray: this.sliderHelper.returnSliderArray(),
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  constructor(
    private store: Store<AppState>,
    private sliderHelper: SliderHelper,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: 5 }));
    this.store.dispatch(getProjectsForCustomPlanting());
    this.proposalSub = this.store.select(selectSimpleProposal).subscribe((proposal) => {
      this.simpleProposal = proposal;
    });
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects;
      });
  }

  ngOnDestroy() {
    this.activeProjectsSub?.unsubscribe();
    this.proposalSub?.unsubscribe();
  }

  getProposal(event) {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: event }));
  }

  putIntoPlantbag() {
    this.store.dispatch(resetPlantbag());
    for (const plantItem of this.simpleProposal.plantItems) {
      for (const project of this.activeProjects) {
        if (project.projectName === plantItem.projectName) {
          for (const article of project.articles) {
            if (article.treeType.name === plantItem.treeType) {
              const item = { article, amount: plantItem.amount };
              this.store.dispatch(addPlantbagItem({ item }));
            }
          }
        }
      }
    }
  }
}
