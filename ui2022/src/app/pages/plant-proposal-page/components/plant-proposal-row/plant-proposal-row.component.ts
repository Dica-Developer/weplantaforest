import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {
  getProjectsForCustomPlanting,
  getSimplePlantProposal,
  selectProjectsForCustomPlanting,
  selectProposalPrice,
  selectSimpleProposal,
  selectSimpleProposalFailed,
} from '../../../../store/plant.store';
import { SliderHelper } from '../../../../util/helper/slider.helper';
import { Observable, Subscription } from 'rxjs';
import { addPlantbagItem, resetPlantbag } from '../../../../store/plantbag.store';
import { TranslateModule } from '@ngx-translate/core';
import { PlantproposalPreviewRowComponent } from '../../../../util/common-components/plantproposal-preview-row/plantproposal-preview-row.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { SliderComponent } from '../../../../util/common-components/slider/slider.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-plant-proposal-row',
  templateUrl: './plant-proposal-row.component.html',
  styleUrls: ['./plant-proposal-row.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    RouterLink,
    NgFor,
    PlantproposalPreviewRowComponent,
    AsyncPipe,
    TranslateModule,
    SliderComponent
  ],
})
export class PlantProposalRowComponent implements OnInit, OnDestroy {
  proposalFailed$ = this.store.select(selectSimpleProposalFailed);
  simpleProposal;
  proposalSub: Subscription;
  proposalPrice$ = this.store.select(selectProposalPrice);

  activeProjects;
  activeProjectsSub: Subscription;
  activeProjects$: Observable<any>;

  showPutIntoPlantbagButton = false;
  showGoToPlantbagButton = false;

  constructor(private store: Store<AppState>, private sliderHelper: SliderHelper) {}

  ngOnInit(): void {
    this.store.dispatch(getSimplePlantProposal({ amountOfTrees: 5 }));
    this.store.dispatch(getProjectsForCustomPlanting());
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects;
      });
    this.proposalSub = this.store.select(selectSimpleProposal).subscribe((proposal) => {
      this.simpleProposal = proposal;
      this.showPutIntoPlantbagButton = true;
      this.showGoToPlantbagButton = false;
    });
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
    this.showPutIntoPlantbagButton = false;
    this.showGoToPlantbagButton = true;
  }

  ngOnDestroy() {
    this.activeProjectsSub?.unsubscribe();
    this.proposalSub?.unsubscribe();
  }
}
