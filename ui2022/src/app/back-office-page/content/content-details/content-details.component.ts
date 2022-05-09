import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import {
  ContentArticleDetails,
  selectContentArticleDetails,
} from '../../../store/content.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectContentArticleDetailsLoading,
  ContentParagraph,
} from '../../../store/content.store';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
})
export class ContentDetailsComponent implements OnInit, OnDestroy {
  details: ContentArticleDetails;
  detailsLoading$: Observable<Boolean>;

  articleForm = new FormGroup({
    id: new FormControl(null),
    articleType: new FormControl('Blog'),
    imageFileName: new FormControl(null),
    intro: new FormControl(''),
    lang: new FormControl('DEUTSCH'),
    showFull: new FormControl(false),
    title: new FormControl(''),
    visible: new FormControl(false),
    createdOn: new FormControl(moment()),
    mainImageFile: new FormControl(null),
    paragraphs: this.fb.array([]),
  });

  detailsSelector = this.store
    .select(selectContentArticleDetails)
    .subscribe((res) => {
      this.details = res;
      if (this.details) {
        this.initForm(this.details);
      }
    });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.detailsLoading$ = this.store.select(
      selectContentArticleDetailsLoading
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.detailsSelector.unsubscribe();
  }

  initForm(details: ContentArticleDetails) {
    this.articleForm.get('id').setValue(details.id);
    this.articleForm.get('articleType').setValue(details.articleType);
    this.articleForm.get('imageFileName').setValue(details.imageFileName);
    this.articleForm.get('showFull').setValue(details.showFull);
    this.articleForm.get('title').setValue(details.title);
    this.articleForm.get('visible').setValue(details.visible);
    this.articleForm.get('lang').setValue(details.lang);
    this.articleForm.get('intro').setValue(details.intro);
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
      imageFile: null
    });
  }
}
