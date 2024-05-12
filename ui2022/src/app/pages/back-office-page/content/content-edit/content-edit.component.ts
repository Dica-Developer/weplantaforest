import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormArray, UntypedFormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { deleteParagraph, selectContentArticleTypes } from '../../../../store/content.store';
import { environment } from '../../../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss'],
})
export class ContentEditComponent implements OnInit, OnDestroy {
  @Input()
  articleForm: UntypedFormGroup;

  @Output()
  saveArticleClicked = new EventEmitter();
  articleTypes: string[];
  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  mainImageFile: any;
  imageSrc: any;

  articleTypesSub;

  imageNameSub;

  constructor(private store: Store<AppState>, private fb: UntypedFormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.handleImageUrl();
    this.imageNameSub = this.articleForm.get('imageFileName').valueChanges.subscribe((res) => {
      this.handleImageUrl();
    });
    this.articleTypesSub = this.store.select(selectContentArticleTypes).subscribe((res) => {
      this.articleTypes = res;
    });
  }

  ngOnDestroy(): void {
    this.articleTypesSub.unsubscribe();
    this.imageNameSub.unsubscribe();
  }

  handleImageUrl() {
    if (this.articleForm.get('imageFileName').value) {
      this.imageSrc =
        environment.backendArticleManagerUrl +
        '/article/image/' +
        this.articleForm.get('id').value +
        '/' +
        this.articleForm.get('imageFileName').value;
    } else {
      this.imageSrc = null;
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.mainImageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mainImageFile);
      this.articleForm.get('mainImageFile').setValue(this.mainImageFile);
    }
  }

  addParagraph() {
    const newParagraph = this.fb.group({
      id: null,
      imageDescription: '',
      imageFileName: '',
      text: '',
      title: '',
      imageFile: null,
    });
    const newArray = [];
    for (const par of this.articleForm.get('paragraphs')['controls']) {
      newArray.push(par);
    }
    newArray.push(newParagraph);
    this.articleForm.controls['paragraphs'] = this.fb.array(newArray);
  }

  deleteParagraph(paragraphId: any) {
    this.store.dispatch(deleteParagraph({ id: paragraphId }));
    let index = this.articleForm.get('paragraphs').value.findIndex((paragraph) => paragraph.id === paragraphId);
    if (index > -1) {
      (this.articleForm.get('paragraphs') as FormArray).removeAt(index)
      this.cdr.detectChanges();
    }
  }

  saveArticle() {
    this.saveArticleClicked.emit();
  }
}
