import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridCheckboxComponent } from './grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from './grid-components/grid-select/grid-select.component';
import { GridCartActionsComponent } from './grid-components/grid-cart-actions/grid-cart-actions.component';
import { GridProjectActionsComponent } from './grid-components/grid-project-actions/grid-project-actions.component';
import { TextEditorComponent } from './common-components/text-editor/text-editor.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    GridCheckboxComponent,
    GridSelectComponent,
    GridCartActionsComponent,
    GridProjectActionsComponent,
    TextEditorComponent,
  ],
  imports: [CommonModule, MaterialModule, NgxEditorModule.forChild({}), FormsModule],
  exports: [MaterialModule, ReactiveFormsModule, TextEditorComponent],
})
export class UtilModule {}
