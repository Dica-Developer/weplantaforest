import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { UtilModule } from "../util/util.module";



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    UtilModule
  ]
})
export class LoginPageModule { }
