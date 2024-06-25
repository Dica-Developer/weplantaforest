import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { TextEditorComponent } from '../../../../../util/common-components/text-editor/text-editor.component';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-edit-data',
  templateUrl: './project-edit-data.component.html',
  styleUrls: ['./project-edit-data.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatDivider,
    TextEditorComponent,
  ],
})
export class ProjectEditDataComponent implements OnInit {
  @Input()
  projectForm: UntypedFormGroup;

  mainImageFile: any;
  imageSrc: any;

  constructor() {
  }

  ngOnInit(): void {
    this.imageSrc =
      environment.backendUrl +
        '/project/image/' +
        this.projectForm.get('imageFileName').value +
        '/400/300';
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
