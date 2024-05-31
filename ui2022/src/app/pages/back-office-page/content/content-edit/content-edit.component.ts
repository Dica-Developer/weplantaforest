import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormArray, UntypedFormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { deleteParagraph, selectContentArticleTypes } from '../../../../store/content.store';
import { environment } from '../../../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { ContentParagraphComponent } from '../content-paragraph/content-paragraph.component';
import { NoImgBoxComponent } from '../../../../util/common-components/no-img-box/no-img-box.component';
import { TextEditorComponent } from '../../../../util/common-components/text-editor/text-editor.component';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
@Component({
    selector: 'app-content-edit',
    templateUrl: './content-edit.component.html',
    styleUrls: ['./content-edit.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        NgFor,
        MatOption,
        MatCheckbox,
        MatButton,
        MatInput,
        MatDatepickerInput,
        MatHint,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatDatepickerActions,
        MatDatepickerCancel,
        MatDatepickerApply,
        TextEditorComponent,
        NgIf,
        NoImgBoxComponent,
        ContentParagraphComponent,
    ],
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
