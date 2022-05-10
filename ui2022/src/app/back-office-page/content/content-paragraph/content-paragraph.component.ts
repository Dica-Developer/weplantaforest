import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-content-paragraph',
  templateUrl: './content-paragraph.component.html',
  styleUrls: ['./content-paragraph.component.scss'],
})
export class ContentParagraphComponent implements OnInit {
  @Input() paragraph: FormGroup;

  imageFile: any;
  imageSrc: any;

  constructor() {}

  ngOnInit(): void {
    this.handleImageUrl();
  }

  handleImageUrl() {
    if (this.paragraph.get('imageFileName').value) {
      this.imageSrc =
        environment.backendArticleManagerUrl +
        '/article/image/' +
        this.paragraph.get('id').value +
        '/' +
        this.paragraph.get('imageFileName').value;
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
      this.paragraph.get('imageFile').setValue(this.imageFile);
    }
  }
}
