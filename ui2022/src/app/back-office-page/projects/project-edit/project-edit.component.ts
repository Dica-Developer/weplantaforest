import { Component, OnInit } from '@angular/core';
import {
  ProjectDetails,
  selectProjectDetails,
  selectProjectDetailsLoading,
  ProjectEditRequest,
} from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { TextHelper } from '../../../util/text.helper';
import { environment } from '../../../../environments/environment';
import {
  ProjectArticle,
  addArticle,
  ProjectImage,
  updateProject,
} from '../../../store/project.store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  details: ProjectDetails;

  detailsLoading$: Observable<Boolean>;


  projectForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    shopActive: new FormControl(false),
    visible: new FormControl(false),
    descriptionDe: new FormControl(''),
    descriptionEn: new FormControl(''),
    imageFileName: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    manager: new FormControl(''),
    positions: new FormControl([]),
    articles: this.fb.array([]),
    images: this.fb.array([]),
    mainImageFile: new FormControl(null)
  });

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private fb: FormBuilder
  ) {
    store.select(selectProjectDetails).subscribe((details) => {
      this.details = details;
      if (details) {
        this.initForm(this.details);
      }
    });

    this.detailsLoading$ = store.select(selectProjectDetailsLoading);
  }

  ngOnInit(): void {}

  initForm(details: ProjectDetails) {
    this.projectForm.get('name').setValue(details.name);
    this.projectForm.get('shopActive').setValue(details.shopActive);
    this.projectForm.get('visible').setValue(details.visible);
    this.projectForm.get('id').setValue(details.id);
    this.projectForm.get('imageFileName').setValue(details.imageFileName);
    this.projectForm.get('mainImageFile').setValue(null);
    this.projectForm.get('latitude').setValue(details.latitude);
    this.projectForm.get('longitude').setValue(details.longitude);
    this.projectForm.get('manager').setValue(details.manager);
    this.projectForm.get('positions').setValue(details.positions);

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

    this.projectForm
      .get('descriptionDe')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'de'));
    this.projectForm
      .get('descriptionEn')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'en'));
  }

  saveData() {
    const fullDescription = this.textHelper.createMultiLanguageEntry(
      this.projectForm.get('descriptionDe').value,
      this.projectForm.get('descriptionEn').value
    );

    const request: ProjectEditRequest = {
      id: this.projectForm.get('id').value,
      name: this.projectForm.get('name').value,
      shopActive: this.projectForm.get('shopActive').value,
      visible: this.projectForm.get('visible').value,
      description: fullDescription,
      positions: this.projectForm.get('positions').value,
      images: [],
      articles: this.projectForm.get('articles').value,
      imageFileName: this.projectForm.get('imageFileName').value,
      latitude: this.projectForm.get('latitude').value,
      longitude: this.projectForm.get('longitude').value,
      manager: this.projectForm.get('manager').value,
    };
    this.store.dispatch(updateProject({ request, mainImageFile: this.projectForm.get('mainImageFile').value}));
    console.log(this.projectForm.get('mainImageFile').value != null);
  }

  createArticleFormGroup(article: ProjectArticle) {
    return this.fb.group({
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
        name: '',
      },
    };
    this.store.dispatch(addArticle({ article }));
  }
}
