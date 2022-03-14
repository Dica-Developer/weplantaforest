import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GridCheckboxComponent } from './grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from './grid-components/grid-select/grid-select.component';
import { GridCartActionsComponent } from './grid-components/grid-cart-actions/grid-cart-actions.component';



@NgModule({
  declarations: [GridCheckboxComponent, GridSelectComponent, GridCartActionsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UtilModule { }
