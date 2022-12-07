import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TextHelper } from '../../../../../util/text.helper';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app.state';
import { environment } from '../../../../../../environments/environment';
import { Subscription } from 'rxjs';
import {
  deleteProjectImage,
  ProjectImageCreateEditRequest,
  createEditProjectImageData,
} from '../../../../../store/project.store';

@Component({
  selector: 'app-project-edit-image',
  templateUrl: './project-edit-image.component.html',
  styleUrls: ['./project-edit-image.component.scss'],
})
export class ProjectEditImageComponent implements OnInit, OnDestroy {
  controlObj: UntypedFormGroup;
  descriptionDe: UntypedFormControl;
  descriptionEn: UntypedFormControl;

  imageSrc: any;

  imageFile: any;

  saveAvailable: boolean;

  @Input()
  projectId: number;

  descDeSub: Subscription;
  descEnSub: Subscription;

  @Input() set control(control: UntypedFormGroup) {
    this.controlObj = control;
    this.descriptionDe = new UntypedFormControl(
      this.textHelper.getTextForLanguage(this.controlObj.get('description').value, 'de'),
    );
    this.descriptionEn = new UntypedFormControl(
      this.textHelper.getTextForLanguage(this.controlObj.get('description').value, 'en'),
    );
    this.descDeSub = this.descriptionDe.valueChanges.subscribe((res) => {
      this.controlObj
        .get('description')
        .setValue(this.textHelper.createMultiLanguageEntry(res, this.descriptionEn.value));
    });
    this.descEnSub = this.descriptionEn.valueChanges.subscribe((res) => {
      this.controlObj
        .get('description')
        .setValue(this.textHelper.createMultiLanguageEntry(this.descriptionDe.value, res));
    });
    this.imageSrc =
      environment.backendUrl +
      '/project/image/' +
      this.controlObj.get('imageFileName').value +
      '/400/300';
  }

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.descDeSub.unsubscribe();
    this.descEnSub.unsubscribe();
  }

  deleteImage() {
    const id = this.controlObj.get('imageId').value;
    const imageFileName = this.controlObj.get('imageFileName').value;
    this.store.dispatch(deleteProjectImage({ id, imageFileName }));
  }

  openDeleteConfirmation() {
    const dialogRef = this.dialog.open(DeleteProjectImageConfirmationDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.controlObj.get('imageId').value) {
          this.deleteImage();
        } else {
          // this.store.dispatch(
          //   deleteArticleWithoutId({ article: this.controlObj.value })
          // );
        }
      }
    });
  }

  updateImage() {
    const projectImageData: ProjectImageCreateEditRequest = {
      imageId: this.controlObj.get('imageId').value,
      title: this.controlObj.get('title').value,
      description: this.controlObj.get('description').value,
      projectId: this.projectId,
    };
    this.store.dispatch(createEditProjectImageData({ projectImageData, file: this.imageFile }));
    this.saveAvailable = false;
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      this.saveAvailable = true;
      reader.readAsDataURL(this.imageFile);
    }
  }
}

@Component({
  selector: 'delete-project-image-confirmation-dialog',
  templateUrl: 'delete-project-image-confirmation-dialog.html',
})
export class DeleteProjectImageConfirmationDialog {}
