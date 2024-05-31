import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import {
  getProjectsForCustomPlanting,
  selectProjectsForCustomPlanting,
  selectSimpleProposal,
} from '../../../../store/plant.store';
import { selectProfileDetails } from '../../../../store/profile.store';
import { AppState } from '../../../../store/app.state';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { FormArray, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { resetPlantbag, addPlantbagItem } from '../../../../store/plantbag.store';
import { addError } from 'src/app/store/error.state';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../util/common-components/button/button.component';
import { CustomPlantTreeInputComponent } from '../../../../util/common-components/custom-plant-tree-input/custom-plant-tree-input.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-custom-planting',
    templateUrl: './custom-planting.component.html',
    styleUrls: ['./custom-planting.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        CustomPlantTreeInputComponent,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        RouterLink,
        TranslateModule,
    ],
})
export class CustomPlantingComponent implements OnInit, OnDestroy {
  activeProjects;
  activeProjectsSub: Subscription;
  profileDetailsSub: Subscription;
  profileDetails;
  language$ = this.store.select(selectProfileDetails);
  proposalSub: Subscription;

  @Input()
  projectId: number;

  formGroup: FormGroup = new FormGroup({});

  showPutIntoPlantbagButton = true;
  showGoToPlantbagButton = false;

  totalPrice: string = '0,00';
  formGroupSub: Subscription;
  combinedSub: Subscription;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.combinedSub = combineLatest([
      this.store.select(selectSimpleProposal),
      this.store.select(selectProjectsForCustomPlanting),
    ]).subscribe(([proposal, projects]) => {
      this.initForm(projects);
      if (proposal) {
        for (const plantItem of proposal.plantItems) {
          if (this.formGroup.get(plantItem.projectName) as FormArray) {
            for (const fg of (this.formGroup.get(plantItem.projectName) as FormArray).controls) {
              if (fg.value.article.treeType.name === plantItem.treeType) {
                fg.get('amount').setValue(plantItem.amount);
              }
            }
          }
        }
      }
    });

    this.profileDetailsSub = this.store.select(selectProfileDetails).subscribe((details) => {
      this.profileDetails = details;
    });
    this.store.dispatch(getProjectsForCustomPlanting());
  }

  ngOnDestroy(): void {
    this.activeProjectsSub?.unsubscribe();
    this.profileDetailsSub?.unsubscribe();
    this.formGroupSub?.unsubscribe();
  }

  getTreeTypeNameByLanguage(text: string) {
    this.language$.subscribe((lang) => {
      return this.textHelper.getTextForLanguage(text, this.profileDetails?.lang ?? lang);
    });
  }

  putIntoPlantbag() {
    this.store.dispatch(resetPlantbag());
    if (this.formGroup.valid) {
      for (const project of Object.keys(this.formGroup.value)) {
        for (const fg of this.formGroup.value[project]) {
          if (fg.amount > 0) {
            const item = { article: fg.article, amount: fg.amount };
            this.store.dispatch(addPlantbagItem({ item }));
          }
        }
      }
      this.showPutIntoPlantbagButton = false;
      this.showGoToPlantbagButton = true;
    } else {
      this.store.dispatch(
        addError({ error: { key: 'validation_error', message: 'Bitte überprüfe deine Eingaben' } }),
      );
    }
  }

  getFormArray(name: string) {
    return (this.formGroup.get(name) as FormArray).controls;
  }

  initForm(projects) {
    this.activeProjects = projects;
    if (this.projectId) {
      this.activeProjects = projects.filter((project) => project.projectId === this.projectId);
    }
    this.formGroup = new FormGroup({});
    for (const project of this.activeProjects) {
      const array = [];
      if (project.articles && project.articles.length > 0) {
        for (const article of project.articles) {
          if (article.amount > article.alreadyPlanted) {
            array.push(
              new FormGroup({
                article: new FormControl(article),
                amount: new FormControl(0, [
                  Validators.min(0),
                  Validators.max(article.amount - article.alreadyPlanted),
                ]),
              }),
            );
          }
        }
      }
      if (array.length !== 0) {
        this.formGroup.addControl(project.projectName, new FormArray(array));
      }else {
        //remove project from activeProjects if there are no articles to plant
        this.activeProjects = this.activeProjects.filter((p) => p.projectId !== project.projectId);
      }
    }
    this.formGroupSub?.unsubscribe();
    this.formGroupSub = this.formGroup.valueChanges.subscribe((value) => {
      let price = 0;
      for (const project of Object.keys(value)) {
        for (const article of value[project]) {
          price += (article.amount * article.article.price.priceAsLong) / 100;
        }
      }
      this.totalPrice = price.toFixed(2).replace('.', ',');
      this.showPutIntoPlantbagButton = true;
      this.showGoToPlantbagButton = false;
    });
  }
}
