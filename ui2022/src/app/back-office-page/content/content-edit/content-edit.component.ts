import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  articleForm: FormGroup;

  articleTypes: string[];
  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  mainImageFile: any;
  imageSrc: any;

  articleTypesSub;

  imageNameSub;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.handleImageUrl();
    this.imageNameSub = this.articleForm
      .get('imageFileName')
      .valueChanges.subscribe((res) => {
        this.handleImageUrl();
      });
    this.imageNameSub = this.store
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
    console.log('handling image url...');
    console.log(this.articleForm.get('imageFileName').value);

    if (this.articleForm.get('imageFileName').value) {
      this.imageSrc =
        environment.backendArticleManagerUrl +
        '/article/image/' +
        this.articleForm.get('id').value +
        '/' +
        this.articleForm.get('imageFileName').value;
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
}
