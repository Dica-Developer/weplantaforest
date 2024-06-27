import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/util/common-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { environment } from '../../../../../environments/environment';
import { NoImgBoxComponent } from '../../../../util/common-components/no-img-box/no-img-box.component';
import { NgIf } from '@angular/common';
import { TextEditorComponent } from '../../../../util/common-components/text-editor/text-editor.component';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
    selector: 'app-content-paragraph',
    templateUrl: './content-paragraph.component.html',
    styleUrls: ['./content-paragraph.component.scss'],
    standalone: true,
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIconButton,
        MatIcon,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        TextEditorComponent,
        NgIf,
        NoImgBoxComponent,
        MatButton,
    ],
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
