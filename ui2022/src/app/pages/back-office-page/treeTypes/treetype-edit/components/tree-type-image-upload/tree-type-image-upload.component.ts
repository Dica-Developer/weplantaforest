import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeTypeImageType } from 'src/app/services/treeType.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tree-type-image-upload',
  templateUrl: './tree-type-image-upload.component.html',
  styleUrls: ['./tree-type-image-upload.component.scss'],
})
export class TreeTypeImageUploadComponent implements OnInit {
  @Output() emitImageChanged = new EventEmitter<any>();
  @Input() imageType: TreeTypeImageType;
  @Input() imageFileName: string;

  imageFile: any;
  imagePreviewSrc: any;
  constructor() {}

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
      this.imageFile = fileInputEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreviewSrc = reader.result);
      reader.readAsDataURL(this.imageFile);
      this.emitImageChanged.emit({ image: this.imageFile, imageType: this.imageType });
    }
  }
}
