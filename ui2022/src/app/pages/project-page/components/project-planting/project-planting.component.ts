import { Options, NgxSliderModule } from '@angular-slider/ngx-slider';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadProjectProposal,
  ProjectReportDetails,
  selectProjectProposal,
  selectProjectProposalPrice,
} from '../../../../store/project-report.store';
import { AppState } from '../../../../store/app.state';
import { SliderHelper } from '../../../../util/helper/slider.helper';
import {
  selectProjectsForCustomPlanting,
  SimplePlantProposal,
} from '../../../../store/plant.store';
import { Observable, Subscription } from 'rxjs';
import { addPlantbagItem, resetPlantbag } from '../../../../store/plantbag.store';
import { TranslateModule } from '@ngx-translate/core';
import { CustomPlantingComponent } from '../../../plant-proposal-page/components/custom-planting/custom-planting.component';
import { PlantproposalPreviewRowComponent } from '../../../../util/common-components/plantproposal-preview-row/plantproposal-preview-row.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
    selector: 'app-project-planting',
    templateUrl: './project-planting.component.html',
    styleUrls: ['./project-planting.component.scss'],
    standalone: true,
    imports: [
        MatTabGroup,
        MatTab,
        NgxSliderModule,
        NgIf,
        ButtonComponent,
        RouterLink,
        NgFor,
        PlantproposalPreviewRowComponent,
        CustomPlantingComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class ProjectPlantingComponent implements OnInit, OnDestroy {
  @Input() projectReport: ProjectReportDetails;

  @Output() showProjectDescription: EventEmitter<void> = new EventEmitter<void>();

  proposal$: Observable<SimplePlantProposal> = this.store.select(selectProjectProposal);
  proposal: SimplePlantProposal;
  proposalSub: Subscription;
  proposalPrice$ = this.store.select(selectProjectProposalPrice);

  activeProjects;
  activeProjectsSub: Subscription;
  activeProjects$: Observable<any>;

  showPutIntoPlantbagButton = false;
  showGoToPlantbagButton = false;

  value: number = 5;
  sliderOptions: Options = {
    stepsArray: this.sliderHelper.returnSliderArray(),
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  constructor(private store: Store<AppState>, private sliderHelper: SliderHelper) {}

  ngOnInit(): void {
    this.proposalSub = this.store.select(selectProjectProposal).subscribe((proposal) => {
      this.proposal = proposal;
      this.showPutIntoPlantbagButton = true;
      this.showGoToPlantbagButton = false;
    });
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects.filter(
          (project) => project.projectId === this.projectReport.projectReportData.projectId,
        );
      });
  }
  ngOnDestroy(): void {
    this.activeProjectsSub?.unsubscribe();
    this.proposalSub?.unsubscribe();
  }

  showProjectDescriptionClicked() {
    this.showProjectDescription.emit();
  }

  getProposal(event) {
    this.store.dispatch(
      loadProjectProposal({
        amountOfTrees: event,
        projectName: this.projectReport.projectReportData.projectName,
      }),
    );
  }

  putIntoPlantbag() {
    this.store.dispatch(resetPlantbag());
    for (const plantItem of this.proposal.plantItems) {
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
}
