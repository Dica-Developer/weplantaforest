import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectContentArticleTypes } from '../../../store/content.store';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss'],
})
export class ContentEditComponent implements OnInit, OnDestroy {
  @Input()
  articleForm: UntypedFormGroup;

  articleTypes: string[];
  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  mainImageFile: any;
  imageSrc: any;

  articleTypesSub;

  imageNameSub;

  constructor(private store: Store<AppState>, private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.handleImageUrl();
    this.imageNameSub = this.articleForm
      .get('imageFileName')
      .valueChanges.subscribe((res) => {
        this.handleImageUrl();
      });
    this.articleTypesSub = this.store
      .select(selectContentArticleTypes)
      .subscribe((res) => {
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
}
