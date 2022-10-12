import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { UtilModule } from '../util/util.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
})
export class LoginPageModule {}
