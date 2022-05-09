import { Component, Input, OnInit } from '@angular/core';
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
export class ContentEditComponent implements OnInit {
  @Input()
  articleForm: FormGroup;

  articleTypes: string[];
  languages: string[] = ['DEUTSCH', 'ENGLISH'];

  mainImageFile: any;
  imageSrc: any;

  constructor(private store: Store<AppState>) {
    store.select(selectContentArticleTypes).subscribe((res) => {
      this.articleTypes = res;
    });
  }

  ngOnInit(): void {
    this.articleForm.get('imageFileName').valueChanges.subscribe((res) => {
      this.handleImageUrl();
    });
  }

  handleImageUrl() {
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
