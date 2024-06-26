import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ProjectDetails,
  selectProjectDetails,
  selectProjectDetailsLoading,
  ProjectEditRequest,
} from '../../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable, Subscription } from 'rxjs';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { addProjectImage } from '../../../../store/project.store';
import {
  ProjectArticle,
  addArticle,
  ProjectImage,
  updateProject,
} from '../../../../store/project.store';
import { ProjectReportDetails } from 'src/app/store/project-report.store';
import { addError } from 'src/app/store/error.state';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProjectDescriptionComponent } from '../../../project-page/components/project-description/project-description.component';
import { ProjectHeaderComponent } from '../../../project-page/components/project-header/project-header.component';
import { ProjectEditImageComponent } from './project-edit-image/project-edit-image.component';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { ProjectEditTreeComponent } from './project-edit-tree/project-edit-tree.component';
import { ProjectEditDataComponent } from './project-edit-data/project-edit-data.component';
import { ProjectEditLocationComponent } from './project-edit-location/project-edit-location.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatTabGroup,
        MatTab,
        ProjectEditLocationComponent,
        ProjectEditDataComponent,
        NgFor,
        ProjectEditTreeComponent,
        MatDivider,
        MatButton,
        ProjectEditImageComponent,
        ProjectHeaderComponent,
        ProjectDescriptionComponent,
        MatProgressSpinner,
        AsyncPipe,
    ],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  details: ProjectDetails;

  detailsLoading$: Observable<Boolean>;

  projectForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(''),
    shopActive: new UntypedFormControl(false),
    visible: new UntypedFormControl(false),
    descriptionDe: new UntypedFormControl(''),
    descriptionEn: new UntypedFormControl(''),
    imageFileName: new UntypedFormControl(''),
    latitude: new UntypedFormControl(''),
    longitude: new UntypedFormControl(''),
    manager: new UntypedFormControl(''),
    positions: new UntypedFormControl([]),
    articles: this.fb.array([]),
    images: this.fb.array([]),
    mainImageFile: new UntypedFormControl(null),
  });

  projectDetails: ProjectReportDetails = {
    projectReportData: {
      projectId: -1,
      projectName: '',
      description: '',
      projectImageFileName: '',
      latitude: 0,
      longitude: 0,
      amountOfMaximumTreesToPlant: 100,
      amountOfPlantedTrees: 12,
      active: false,
      projectImageUrl: '',
      projectLink: '',
      positions: [],
    },
    images: [],
    positions: [],
  };

  projectDetailsSub: Subscription;

  descriptionSub: Subscription;
  nameSUb: Subscription;

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private fb: UntypedFormBuilder,
  ) {
    this.projectDetailsSub = store.select(selectProjectDetails).subscribe((details) => {
      this.details = details;
      if (details) {
        this.initForm(this.details);
      }
    });

    this.detailsLoading$ = store.select(selectProjectDetailsLoading);
  }

  ngOnInit(): void {
    this.descriptionSub = this.projectForm.get('descriptionDe').valueChanges.subscribe((value) => {
      this.projectDetails.projectReportData.description = value;
    });

    this.nameSUb = this.projectForm.get('name').valueChanges.subscribe((value) => {
      this.projectDetails.projectReportData.projectName = value;
    });
  }

  ngOnDestroy(): void {
    this.projectDetailsSub.unsubscribe();
    this.descriptionSub?.unsubscribe();
    this.nameSUb?.unsubscribe();
  }

  initForm(details: ProjectDetails) {
    //for new id set data, for the same one, leave as is to not overwrite edited but not saved data
    this.projectForm.get('manager').setValue(details.manager);
    if (this.projectForm.get('id').value !== details.id) {
      this.projectForm.get('name').setValue(details.name);
      this.projectDetails.projectReportData.projectName = details.name;
      this.projectForm.get('shopActive').setValue(details.shopActive);
      this.projectForm.get('visible').setValue(details.visible);
      this.projectForm.get('id').setValue(details.id);
      this.projectForm.get('imageFileName').setValue(details.imageFileName);
      this.projectForm.get('mainImageFile').setValue(null);
      this.projectForm.get('latitude').setValue(details.latitude);
      this.projectForm.get('longitude').setValue(details.longitude);
      this.projectForm.get('positions').setValue(details.positions);

      this.projectForm
        .get('descriptionDe')
        .setValue(this.textHelper.getTextForLanguage(details.description, 'de'));
      this.projectForm
        .get('descriptionEn')
        .setValue(this.textHelper.getTextForLanguage(details.description, 'en'));
      this.projectDetails.projectReportData.description = this.textHelper.getTextForLanguage(
        details.description,
        'de',
      );

      let articleArray = [];
      for (let article of details.articles) {
        articleArray.push(this.createArticleFormGroup(article));
      }
      this.projectForm.controls['articles'] = this.fb.array(articleArray);

      let imageArray = [];
      for (let image of details.images) {
        imageArray.push(this.createImageFormGroup(image));
      }
      this.projectForm.controls['images'] = this.fb.array(imageArray);
    } else {
      //if article were added, create new one, push it to 1st entry
      this.createArticleFormGroups(details);

      //same for imageArray
      this.createImageFormGroups(details);
    }
  }

  saveData() {
    let articlesValid = true;
    const usedTreeTypes = [];
    for (const article of this.projectForm.get('articles')['controls']) {
      if(usedTreeTypes.includes(article.value.treeType.id)) {
        this.store.dispatch(
          addError({
            error: {
              key: 'PROJECT_VALIDATION_ERROR',
              message: 'Eine Baumart darf nur einmal verwendet werden.',
            },
          }),
        );
        return;
      }
      usedTreeTypes.push(article.value.treeType.id);
      if (article.status === 'INVALID') {
        articlesValid = false;
        article.get('treeType').get('id').markAsTouched();
        if (!article.value.treeType.id) {
          this.store.dispatch(
            addError({
              error: {
                key: 'PROJECT_VALIDATION_ERROR',
                message: 'Jedem hinzugefügtem Baum muss eine Baumart zugesiwesen sein.',
              },
            }),
          );
        }
      }
    }
    if (!articlesValid) {
      return;
    }

    const fullDescription = this.textHelper.createMultiLanguageEntry(
      this.projectForm.get('descriptionDe').value,
      this.projectForm.get('descriptionEn').value,
    );
    const articles = [];
    const articleControlArray = this.projectForm.controls['articles'] as UntypedFormArray;
    for (let article of articleControlArray.controls) {
      articles.push(article.value);
    }
    const request: ProjectEditRequest = {
      id: this.projectForm.get('id').value,
      name: this.projectForm.get('name').value,
      shopActive: this.projectForm.get('shopActive').value,
      visible: this.projectForm.get('visible').value,
      description: fullDescription,
      positions: this.projectForm.get('positions').value,
      images: [],
      articles,
      imageFileName: this.projectForm.get('imageFileName').value,
      latitude: this.projectForm.get('latitude').value,
      longitude: this.projectForm.get('longitude').value,
      manager: this.projectForm.get('manager').value,
    };
    if (request.shopActive && request.articles.length === 0) {
      this.store.dispatch(
        addError({
          error: {
            key: 'PROJECT_VALIDATION_ERROR',
            message: 'Ein aktives Projekt muss mindestens einen Baum haben',
          },
        }),
      );
    } else {
      this.store.dispatch(
        updateProject({
          request,
          mainImageFile: this.projectForm.get('mainImageFile').value,
        }),
      );
    }
  }

  createArticleFormGroups(details: ProjectDetails) {
    const articleControlArray = this.projectForm.controls['articles'] as UntypedFormArray;
    //article added
    if (articleControlArray.controls.length < details.articles.length) {
      const diff = details.articles.length - articleControlArray.controls.length;
      for (let i = 0; i < diff; i++) {
        articleControlArray.controls.splice(0, 0, this.createArticleFormGroup(details.articles[i]));
      }
    }
    //article removed is handled via eventEmitter
    this.projectForm.controls['articles'] = articleControlArray;
  }

  removeArticleForm(index: number) {
    const articleControlArray = this.projectForm.controls['articles'] as UntypedFormArray;
    articleControlArray.controls.splice(index, 1);
    this.projectForm.controls['articles'] = articleControlArray;
  }

  createImageFormGroups(details: ProjectDetails) {
    const imageControlArray = this.projectForm.controls['images'] as UntypedFormArray;
    if (imageControlArray.controls.length < details.images.length) {
      const diff = details.images.length - imageControlArray.controls.length;
      for (let i = 0; i < diff; i++) {
        imageControlArray.controls.splice(0, 0, this.createImageFormGroup(details.images[i]));
      }
    }
    this.projectForm.controls['images'] = imageControlArray;
  }

  createArticleFormGroup(article: ProjectArticle) {
    const articleFormGroup = this.fb.group({
      amount: article.amount,
      articleId: article.articleId,
      price: this.fb.group({
        amount: article.price.amount,
        funding: article.price.funding,
        marge: article.price.marge,
        priceId: article.price.priceId,
        sconto: article.price.sconto,
        scontoType: article.price.scontoType,
      }),
      treeType: this.fb.group({
        id: article.treeType.id,
        name: article.treeType.name,
      }),
    });

    articleFormGroup.get('treeType').get('id').addValidators([Validators.required]);

    return articleFormGroup;
  }

  createImageFormGroup(image: ProjectImage) {
    return this.fb.group({
      date: image.date,
      description: image.description,
      imageFileName: image.imageFileName,
      imageId: image.imageId,
      title: image.title,
    });
  }

  addArticle() {
    const article = {
      amount: 0,
      articleId: null,
      price: {
        amount: 0,
        funding: 0,
        marge: 0,
        priceId: null,
        sconto: 0,
        scontoType: 'NONE',
      },
      treeType: {
        id: null,
        treeImageColor: '',
        treeImageBW: '',
        fruitImageColor: '',
        fruitImageBW: '',
        trunkImageColor: '',
        leafImage: '',
        description: '',
        fruit: '',
        leaf: '',
        trunk: '',
        name: '',
      },
    };
    this.store.dispatch(addArticle({ article }));
  }

  addImage() {
    const image: ProjectImage = {
      date: new Date().getTime(),
      imageId: null,
      title: '',
      description: '',
      imageFileName: '',
    };
    this.store.dispatch(addProjectImage({ image }));
  }
}
