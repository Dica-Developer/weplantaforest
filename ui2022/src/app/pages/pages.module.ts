import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficePageModule } from './back-office-page/back-office-page.module';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LoginPageModule } from './login-page/login-page.module';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilModule } from '../util/util.module';
import { RankingPageModule } from './ranking-page/ranking-page.module';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectHeaderComponent } from './project-page/components/project-header/project-header.component';
import { ProjectDescriptionComponent } from './project-page/components/project-description/project-description.component';
import { ProjectFeedComponent } from './project-page/components/project-feed/project-feed.component';

@NgModule({
  declarations: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    ProjectPageComponent,
    ProjectHeaderComponent,
    ProjectDescriptionComponent,
    ProjectFeedComponent,
  ],
  imports: [
    CommonModule,
    HomePageModule,
    BackofficePageModule,
    LoginPageModule,
    UtilModule,
    RankingPageModule,
  ],
  exports: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
  ],
})
export class PagesModule {}
