import { Component, OnInit } from '@angular/core';
import {
  ProjectDetails,
  selectProjectDetails,
  selectProjectDetailsLoading,
  ProjectEditRequest,
} from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { TextHelper } from '../../../util/text.helper';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  details: ProjectDetails;

  detailsLoading$: Observable<Boolean>;

  projectForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    shopActive: new FormControl(false),
    visible: new FormControl(false),
    descriptionDe: new FormControl(''),
    descriptionEn: new FormControl(''),
    imageFileName: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    manager: new FormControl(''),
    positions: new FormControl([])
  });

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {
    store.select(selectProjectDetails).subscribe((details) => {
      this.details = details;
      if (details) {
        this.initForm(this.details);
      }
    });

    this.detailsLoading$ = store.select(selectProjectDetailsLoading);
  }

  ngOnInit(): void {}

  initForm(details: ProjectDetails) {
    this.projectForm.get('name').setValue(details.name);
    this.projectForm.get('shopActive').setValue(details.shopActive);
    this.projectForm.get('visible').setValue(details.visible);
    this.projectForm.get('id').setValue(details.id);
    this.projectForm.get('imageFileName').setValue(details.imageFileName);
    this.projectForm.get('latitude').setValue(details.latitude);
    this.projectForm.get('longitude').setValue(details.longitude);
    this.projectForm.get('manager').setValue(details.manager);
    this.projectForm.get('positions').setValue(details.positions);

    this.projectForm
      .get('descriptionDe')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'de'));
    this.projectForm
      .get('descriptionEn')
      .setValue(this.textHelper.getTextForLanguage(details.description, 'en'));
  }

  saveData() {
    const fullDescription = this.textHelper.createMultiLanguageEntry(
      this.projectForm.get('descriptionDe').value,
      this.projectForm.get('descriptionEn').value
    );
    const request: ProjectEditRequest = {
      id: this.projectForm.get('id').value,
      name: this.projectForm.get('name').value,
      shopActive: this.projectForm.get('shopActive').value,
      visible: this.projectForm.get('visible').value,
      description: fullDescription,
      positions: this.projectForm.get('positions').value,
      images: [],
      articles: [],
      imageFileName: this.projectForm.get('imageFileName').value,
      latitude: this.projectForm.get('latitude').value,
      longitude: this.projectForm.get('longitude').value,
      manager: this.projectForm.get('manager').value,
    };
    console.log(request);
  }
}
