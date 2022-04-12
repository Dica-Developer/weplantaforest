import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-project-edit-data',
  templateUrl: './project-edit-data.component.html',
  styleUrls: ['./project-edit-data.component.scss'],
})
export class ProjectEditDataComponent implements OnInit {
  @Input()
  projectForm: FormGroup;

  mainImageFile: any;
  imageSrc: any;

  constructor() {
  }

  ngOnInit(): void {
    this.imageSrc = environment.backendUrl + '/project/image/' + this.projectForm.get('imageFileName').value + '/400/300';
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.mainImageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mainImageFile);
      this.projectForm.get('mainImageFile').setValue(this.mainImageFile);
    }
  }

}
