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
import { TeamPageModule } from './team-page/team-page.module';
import { PlantProposalPageComponent } from './plant-proposal-page/plant-proposal-page.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PlantbagPageComponent } from './plantbag-page/plantbag-page.component';
import { ContactModule } from './contact-page/contact-page.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { BlogPageModule } from './blog-page/blog-page.module';
import { PaymentOptionsPageComponent } from './payment-options-page/payment-options-page.component';
import { FinancesPageComponent } from './finances-page/finances-page.component';
import { PartnerPageComponent } from './partner-page/partner-page.component';
import { SepaPageComponent } from './sepa-page/sepa-page.component';
import { RouterModule } from '@angular/router';
import { PlantSelfPageComponent } from './plant-self-page/plant-self-page.component';
import { FactsPageComponent } from './facts-page/facts-page/facts-page.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    PlantProposalPageComponent,
    PlantbagPageComponent,
    AboutPageComponent,
    PaymentOptionsPageComponent,
    FinancesPageComponent,
    PartnerPageComponent,
    SepaPageComponent,
    PlantSelfPageComponent,
    FactsPageComponent,
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
    TeamPageModule,
    NgxSliderModule,
    ContactModule,
    BlogPageModule,
    RouterModule,
    NgChartsModule,
  ],
  exports: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    PaymentOptionsPageComponent,
    FinancesPageComponent,
    PartnerPageComponent,
  ],
})
export class PagesModule {}
