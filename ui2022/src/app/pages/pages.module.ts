import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficePageModule } from './back-office-page/back-office-page.module';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { RankingPageModule } from './ranking-page/ranking-page.module';

@NgModule({
  declarations: [ForgotPasswordPageComponent, ResetPasswordPageComponent],
  imports: [CommonModule, HomePageModule, BackofficePageModule, LoginPageModule, RankingPageModule],
  exports: [ForgotPasswordPageComponent, ResetPasswordPageComponent, RankingPageModule],
})
export class PagesModule {}
