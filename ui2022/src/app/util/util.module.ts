import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GridCheckboxComponent } from './grid-components/grid-checkbox/grid-checkbox.component';



@NgModule({
  declarations: [GridCheckboxComponent],
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
