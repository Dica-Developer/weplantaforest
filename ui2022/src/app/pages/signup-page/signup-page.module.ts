import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { SignupPageComponent } from './signup-page.component';

@NgModule({
  declarations: [SignupPageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
})
export class SignupPageModule {}
