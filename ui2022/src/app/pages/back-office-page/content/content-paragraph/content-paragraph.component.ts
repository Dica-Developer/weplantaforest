import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { deleteParagraph } from 'src/app/store/content.store';
import { DeleteConfirmationDialogComponent } from 'src/app/util/common-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-content-paragraph',
  templateUrl: './content-paragraph.component.html',
  styleUrls: ['./content-paragraph.component.scss'],
})
export class ContentParagraphComponent implements OnInit {
  @Input() paragraph: UntypedFormGroup;
  @Output() deleteParagraphClicked: EventEmitter<void> = new EventEmitter<void>();

  imageFile: any;
  imageSrc: any;

  constructor( public dialog: MatDialog ) {}

  ngOnInit(): void {
    this.handleImageUrl();
  }

  deleteParagraph(paragraphId: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteParagraphClicked.emit(paragraphId);
      }
    });
  }

  handleImageUrl() {
    if (this.paragraph.get('imageFileName').value) {
      this.imageSrc =
        environment.backendArticleManagerUrl +
        '/article/image/' +
        this.paragraph.get('id').value +
        '/' +
        this.paragraph.get('imageFileName').value;
    } else {
      this.imageSrc = null;
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
