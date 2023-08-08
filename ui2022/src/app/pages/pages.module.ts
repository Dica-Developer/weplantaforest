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
import { NgxPayPalModule } from 'ngx-paypal';
import { ExplorePageModule } from './explore-page/explore-page.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { OfferProjectPageComponent } from './offer-project-page/offer-project-page.component';
import { SignupPageModule } from './signup-page/signup-page.module';
import { VerifyRegistrationPageComponent } from './verify-registration-page/verify-registration-page.component';
import { PlantProposalPageModule } from './plant-proposal-page/plant-proposal-page.module';
import { GiftRedeemPageComponent } from './gift-redeem-page/gift-redeem-page.component';

@NgModule({
  declarations: [
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ImprintPageComponent,
    PrivacyPageComponent,
    PlantbagPageComponent,
    AboutPageComponent,
    PaymentOptionsPageComponent,
    FinancesPageComponent,
    PartnerPageComponent,
    SepaPageComponent,
    PlantSelfPageComponent,
    FactsPageComponent,
    NotFoundPageComponent,
    OfferProjectPageComponent,
    VerifyRegistrationPageComponent,
    GiftRedeemPageComponent,
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
    ContactModule,
    BlogPageModule,
    RouterModule,
    NgChartsModule,
    NgxPayPalModule,
    ExplorePageModule,
    SignupPageModule,
    PlantProposalPageModule,
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
