import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  getSimplePlantProposal,
  selectProposalPrice,
  selectSimpleProposal,
} from 'src/app/store/plant.store';
import { Options } from '@angular-slider/ngx-slider';
import { TranslateService } from '@ngx-translate/core';
import { loadActiveProjects, selectActiveProjects } from 'src/app/store/project.store';
import { Observable, Subscription, take } from 'rxjs';
import { addPlantbagItem, resetPlantbag } from 'src/app/store/plantbag.store';
import { SliderHelper } from 'src/app/util/helper/slider.helper';

@Component({
  selector: 'app-plant-self-page',
  templateUrl: './plant-self-page.component.html',
  styleUrls: ['./plant-self-page.component.scss'],
})
export class PlantSelfPageComponent implements OnInit {
  value: number = 5;

  simpleProposal;
  activeProjects;
  proposalSub: Subscription;
  activeProjectsSub: Subscription;

  proposalPrice$ = this.store.select(selectProposalPrice);
  activeProjects$: Observable<any>;

  sliderOptions: Options = {
    stepsArray: this.sliderHelper.returnSliderArray(),
    showTicks: false,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: false,
  };

  constructor(
    private store: Store<AppState>,
    private sliderHelper: SliderHelper,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: 5 }));
    this.proposalSub = this.store.select(selectSimpleProposal).subscribe((proposal) => {
      this.simpleProposal = proposal;
    });
    this.store.dispatch(loadActiveProjects());
    this.activeProjectsSub = this.store.select(selectActiveProjects).subscribe((activeProjects) => {
      this.activeProjects = activeProjects;
    });
    this.activeProjects$ = this.store.select(selectActiveProjects);
  }

  ngOnDestroy() {
    this.activeProjectsSub.unsubscribe();
    this.proposalSub.unsubscribe();
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
