import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  getSimplePlantProposal,
  selectProposalPrice,
  selectSimpleProposal,
} from 'src/app/store/plant.store';
import { Options } from '@angular-slider/ngx-slider';
import { loadActiveProjects, selectActiveProjects, TreeType } from 'src/app/store/project.store';
import { Observable, Subscription, take } from 'rxjs';
import { addPlantbagItem, resetPlantbag } from 'src/app/store/plantbag.store';
import { SliderHelper } from 'src/app/util/helper/slider.helper';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-plant-self-page',
  templateUrl: './plant-self-page.component.html',
  styleUrls: ['./plant-self-page.component.scss'],
})
export class PlantSelfPageComponent implements OnInit {
  controlObj: UntypedFormGroup;
  selectedTreeType: TreeType;
  treeTypes: TreeType[] = [];
  value: number = 5;
  screenWidth;
  mapHeight: string = '700px';

  simpleProposal;
  activeProjects;
  activeProjectsSub: Subscription;

  treeTypes$ = this.store.select(selectTreeTypes);
  activeProjects$: Observable<any>;

  sliderOptions: Options = {
    stepsArray: this.sliderHelper.returnSliderArray(),
    showTicks: true,
    showTicksValues: false,
    hideLimitLabels: true,
    hidePointerLabels: false,
  };
  selectTreetypesSub: Subscription;

  selfPlantForm = new UntypedFormGroup({
    shortDescription: new UntypedFormControl(''),
  });

  constructor(
    private store: Store<AppState>,
    private sliderHelper: SliderHelper,
    private textHelper: TextHelper,
  ) {
    this.store.dispatch(loadTreeTypes());
    this.selectTreetypesSub = store.select(selectTreeTypes).subscribe((res) => {
      for (let tt of res) {
        this.treeTypes.push({
          id: tt.id,
          imageFileName: tt.imageFileName,
          description: tt.description,
          name: this.textHelper.getTextForLanguage(tt.name, 'de'),
        });
      }
    });
    this.getScreenSize();
  }

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.screenWidth < 764) {
      this.mapHeight = '500px';
    }
    this.store.dispatch(loadActiveProjects());
    this.activeProjectsSub = this.store.select(selectActiveProjects).subscribe((activeProjects) => {
      this.activeProjects = activeProjects;
    });
    this.activeProjects$ = this.store.select(selectActiveProjects);
  }

  ngOnDestroy() {
    this.activeProjectsSub.unsubscribe();
  }

  addTreesToForm(event) {
    console.log(event.value);
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

  treeTypeChanged($event) {
    console.log($event.value);
    this.selectedTreeType = $event.value;
  }

  addOtherTreeType() {}

  submitPlanting() {}
}
