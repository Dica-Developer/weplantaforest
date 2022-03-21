import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {
  ProjectDetails,
  selectProjectDetails,
} from '../../../../store/project.store';
import { FormGroup, FormControl } from '@angular/forms';
import { TextHelper } from '../../../../util/text.helper';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-project-edit-data',
  templateUrl: './project-edit-data.component.html',
  styleUrls: ['./project-edit-data.component.scss'],
})
export class ProjectEditDataComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl(''),
    shopActive: new FormControl(false),
    visible: new FormControl(false),
    descriptionDe: new FormControl(''),
    descriptionEn: new FormControl(''),
  });

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {
    store.select(selectProjectDetails).subscribe((details) => {
      this.initForm(details);
    });
  }

  ngOnInit(): void {}

  initForm(details: ProjectDetails) {
    this.projectForm.get('name').setValue(details.name);
    this.projectForm.get('shopActive').setValue(details.shopActive);
    this.projectForm.get('visible').setValue(details.visible);
    this.projectForm
      .get('descriptionDe')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'de'));
    this.projectForm
      .get('descriptionEn')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'en'));
  }

  saveData() {
    console.log(this.projectForm.value);
  }
}
