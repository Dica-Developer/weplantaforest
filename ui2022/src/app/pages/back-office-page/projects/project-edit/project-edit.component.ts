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
} from '@angular/forms';
import { TextHelper } from '../../../../util/text.helper';
import { addProjectImage } from '../../../../store/project.store';
import {
  ProjectArticle,
  addArticle,
  ProjectImage,
  updateProject,
} from '../../../../store/project.store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
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

  projectDetailsSub: Subscription;

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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.projectDetailsSub.unsubscribe();
  }

  initForm(details: ProjectDetails) {
    //for new id set data, for the same one, leave as is to not overwrite edited but not saved data
    this.projectForm.get('manager').setValue(details.manager);
    if (this.projectForm.get('id').value !== details.id) {
      this.projectForm.get('name').setValue(details.name);
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
    this.store.dispatch(
      updateProject({
        request,
        mainImageFile: this.projectForm.get('mainImageFile').value,
      }),
    );
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
