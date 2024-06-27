import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TreeTypeImageType } from 'src/app/services/treeType.service';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { addError } from '../../../../../../store/error.state';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-tree-type-image-upload',
    templateUrl: './tree-type-image-upload.component.html',
    styleUrls: ['./tree-type-image-upload.component.scss'],
    standalone: true,
    imports: [NgIf, MatButton],
})
export class TreeTypeImageUploadComponent implements OnInit {
  @Output() emitImageChanged = new EventEmitter<any>();
  @Input() imageType: TreeTypeImageType;
  @Input() imageFileName: string;

  imageFile: any;
  imagePreviewSrc: any;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.imageFileName) {
      this.imagePreviewSrc =
        environment.backendUrl + '/treeType/image/' + this.imageFileName + '/150/150';
    } else {
      this.imagePreviewSrc = null;
    }
  }

  imageChanged(fileInputEvent: any) {
    if (fileInputEvent.target.files && fileInputEvent.target.files[0]) {
      if (fileInputEvent.target.files[0].size >= 1048576) {
        this.store.dispatch(
          addError({
            error: {
              key: 'IMAGE_VALIDATION_ERROR',
              message: 'Das Bild darf nicht größer als 1 MB sein.',
            },
          }),
        );
        return;
      }

      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreviewSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
      this.emitImageChanged.emit({ image: this.imageFile, imageType: this.imageType });
    }
  }
}
