import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridCheckboxComponent } from './grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from './grid-components/grid-select/grid-select.component';
import { GridCartActionsComponent } from './grid-components/grid-cart-actions/grid-cart-actions.component';
import {
  GridProjectActionsComponent,
  DeleteProjectConfirmationDialog,
} from './grid-components/grid-project-actions/grid-project-actions.component';
import { TextEditorComponent } from './common-components/text-editor/text-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import {
  GridContentActionsComponent,
  DeleteContentArticleConfirmationDialog,
} from './grid-components/grid-content-actions/grid-content-actions.component';
import { NoImgBoxComponent } from './common-components/no-img-box/no-img-box.component';
import { GridEventActionsComponent } from './grid-components/grid-event-actions/grid-event-actions.component';

@NgModule({
  declarations: [
    GridCheckboxComponent,
    GridSelectComponent,
    GridCartActionsComponent,
    GridProjectActionsComponent,
    TextEditorComponent,
    DeleteProjectConfirmationDialog,
    GridContentActionsComponent,
    DeleteContentArticleConfirmationDialog,
    NoImgBoxComponent,
    GridEventActionsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxEditorModule.forChild({}),
    FormsModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    TextEditorComponent,
    NoImgBoxComponent,
  ],
})
export class UtilModule {}
