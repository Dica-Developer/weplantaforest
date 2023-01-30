import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficePageModule } from './back-office-page/back-office-page.module';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';
import { UtilModule } from '../util/util.module';
import { RankingPageModule } from './ranking-page/ranking-page.module';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProjectPageModule } from './project-page/project-page.module';
import { ProjectReportsOverviewModule } from './project-reports-overview-page/project-reports-overview.module';
import { ProfilePageModule } from './profile-page/profile-page.module';

@NgModule({
  declarations: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
  ],
  imports: [
    CommonModule,
    HomePageModule,
    BackofficePageModule,
    LoginPageModule,
    UtilModule,
    ProjectPageModule,
    RankingPageModule,
    ProjectReportsOverviewModule,
    ProfilePageModule,
  ],
  exports: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
  ],
})
export class PagesModule {}
