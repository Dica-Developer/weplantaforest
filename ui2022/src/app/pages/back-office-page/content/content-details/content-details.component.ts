import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import {
  ContentArticleDetails,
  selectContentArticleDetails,
} from '../../../../store/content.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectContentArticleDetailsLoading,
  ContentParagraph,
} from '../../../../store/content.store';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { selectUsername } from '../../../../store/profile.store';
import { saveContentArticle } from '../../../../store/content.store';
import { ContentEditComponent } from '../content-edit/content-edit.component';

@Component({
    selector: 'app-content-details',
    templateUrl: './content-details.component.html',
    styleUrls: ['./content-details.component.scss'],
    standalone: true,
    imports: [ContentEditComponent],
})
export class ContentDetailsComponent implements OnInit, OnDestroy {
  details: ContentArticleDetails;
  detailsLoading$: Observable<Boolean>;

  articleForm = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    articleType: new UntypedFormControl('Blog'),
    imageFileName: new UntypedFormControl(null),
    intro: new UntypedFormControl(''),
    lang: new UntypedFormControl('DEUTSCH'),
    showFull: new UntypedFormControl(false),
    title: new UntypedFormControl(''),
    visible: new UntypedFormControl(false),
    createdOn: new UntypedFormControl(new Date()),
    mainImageFile: new UntypedFormControl(null),
    paragraphs: this.fb.array([]),
    imageDescription: new UntypedFormControl(''),
    owner: new UntypedFormControl(''),
  });

  detailsSelector = this.store.select(selectContentArticleDetails).subscribe((res) => {
    this.details = res;
    if (this.details) {
      this.initForm(this.details);
    }
  });

  username;

  usernameSub = this.store.select(selectUsername).subscribe((res) => {
    this.username = res;
  });

  constructor(private store: Store<AppState>, private fb: UntypedFormBuilder) {
    this.detailsLoading$ = this.store.select(selectContentArticleDetailsLoading);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.detailsSelector.unsubscribe();
    this.usernameSub.unsubscribe();
  }

  initForm(details: ContentArticleDetails) {
    this.articleForm.get('id').setValue(details.id);
    this.articleForm.get('articleType').setValue(details.articleType);
    this.articleForm.get('imageFileName').setValue(details.imageFileName);
    this.articleForm.get('imageDescription').setValue(details.imageDescription);
    this.articleForm.get('showFull').setValue(details.showFull);
    this.articleForm.get('title').setValue(details.title);
    this.articleForm.get('visible').setValue(details.visible);
    this.articleForm.get('lang').setValue(details.lang);
    this.articleForm.get('intro').setValue(details.intro);
    this.articleForm.get('owner').setValue(details.owner);
    this.articleForm.get('createdOn').setValue(new Date(details.createdOn));
    let paragrapArray = [];
    for (let paragraph of details.paragraphs) {
      paragrapArray.push(this.createParagraphFormGroup(paragraph));
    }
    this.articleForm.controls['paragraphs'] = this.fb.array(paragrapArray);
  }

  createParagraphFormGroup(paragraph: ContentParagraph) {
    return this.fb.group({
      id: paragraph.id,
      imageDescription: paragraph.imageDescription,
      imageFileName: paragraph.imageFileName,
      text: paragraph.text,
      title: paragraph.title,
      imageFile: null,
    });
  }

  saveArticle() {
    const paragraphs = [];
    const paragraphImages = [];
    let paragraphCnt = 0;
    for (let paragraph of this.articleForm.get('paragraphs')['controls']) {
      paragraphs.push({
        id: paragraph.get('id').value,
        imageDescription: paragraph.get('imageDescription').value,
        imageFileName: paragraph.get('imageFileName').value,
        text: paragraph.get('text').value,
        title: paragraph.get('title').value,
      });
      if (paragraph.get('imageFile').value) {
        paragraphImages.push({
          imageFile: paragraph.get('imageFile').value,
          articleId: this.articleForm.get('id').value,
          paragraphId: paragraph.get('id').value ? paragraph.get('id').value : 'no ' + paragraphCnt,
        });
      }
      paragraphCnt++;
    }

    let request: ContentArticleDetails = {
      id: this.articleForm.get('id').value,
      articleType: this.articleForm.get('articleType').value,
      createdOn: new Date(this.articleForm.get('createdOn').value).valueOf(),
      imageDescription: this.articleForm.get('imageDescription').value,
      imageFileName: this.articleForm.get('imageFileName').value,
      intro: this.articleForm.get('intro').value,
      lang: this.articleForm.get('lang').value,
      showFull: this.articleForm.get('showFull').value,
      title: this.articleForm.get('title').value,
      visible: this.articleForm.get('visible').value,
      owner: this.articleForm.get('owner').value,
      paragraphs,
    };
    this.store.dispatch(
      saveContentArticle({
        request,
        userName: this.username,
        paragraphImages,
        articleImage: this.articleForm.get('mainImageFile').value,
      }),
    );
  }
}
