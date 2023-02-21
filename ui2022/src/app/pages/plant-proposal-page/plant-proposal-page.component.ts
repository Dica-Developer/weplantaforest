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

  translateTreeSub: Subscription;
  translateTreesSub: Subscription;

  sliderOptions: Options = {
    stepsArray: [],
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  constructor(private store: Store<AppState>, private translateService: TranslateService) {}

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

    this.translateTreeSub = this.translateService.get('tree').subscribe((tree) => {
      [{ value: 1, legend: `1 ${tree}` }];
      this.sliderOptions.stepsArray = [
        { value: 1, legend: `1 ${tree}` },
        ...this.sliderOptions.stepsArray,
      ];
    });

    this.translateTreesSub = this.translateService.get('trees').subscribe((trees) => {
      this.sliderOptions.stepsArray.push({
        value: 5,
        legend: `5 ${trees}`,
      });
      this.sliderOptions.stepsArray.push({
        value: 10,
        legend: `10 ${trees}`,
      });
      this.sliderOptions.stepsArray.push({
        value: 50,
        legend: `50 ${trees}`,
      });

      this.sliderOptions.stepsArray.push({
        value: 100,
        legend: `100 ${trees}`,
      });
    });
  }

  ngOnDestroy() {
    this.activeProjectsSub.unsubscribe();
    this.proposalSub.unsubscribe();
    this.translateTreeSub.unsubscribe();
    this.translateTreesSub.unsubscribe();
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
