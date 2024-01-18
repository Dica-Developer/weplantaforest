import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeRouterOutletComponent } from './router-outlets/back-office-router-outlet/back-office-router-outlet.component';
import { CartsOverviewComponent } from './pages/back-office-page/carts/carts-overview/carts-overview.component';
import { ContentOverviewComponent } from './pages/back-office-page/content/content-overview/content-overview.component';
import { EventsOverviewComponent } from './pages/back-office-page/events/events-overview/events-overview.component';
import { PlantForUserComponent } from './pages/back-office-page/plant-for-user/plant-for-user/plant-for-user.component';
import { ProjectsOverviewComponent } from './pages/back-office-page/projects/projects-overview/projects-overview.component';
import { TransferTreesComponent } from './pages/back-office-page/transfer-trees/transfer-trees/transfer-trees.component';
import { TreetypesOverviewComponent } from './pages/back-office-page/treeTypes/treetypes-overview/treetypes-overview.component';
import { UserOverviewComponent } from './pages/back-office-page/user/user-overview/user-overview.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { AuthGuard } from './util/auth.guard';
import { UtilModule } from './util/util.module';
import { UserRouterOutletComponent } from './router-outlets/user-router-outlet/user-router-outlet.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectReportsOverviewPageComponent } from './pages/project-reports-overview-page/project-reports-overview-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { PlantProposalPageComponent } from './pages/plant-proposal-page/plant-proposal-page.component';
import { PlantbagPageComponent } from './pages/plantbag-page/plantbag-page.component';
import { NewsletterComponent } from './util/common-components/newsletter/newsletter.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BlogOverviewPageComponent } from './pages/blog-page/blog-overview-page/blog-overview-page.component';
import { BlogArticlePageComponent } from './pages/blog-page/blog-article-page/blog-article-page.component';
import { PaymentOptionsPageComponent } from './pages/payment-options-page/payment-options-page.component';
import { FinancesPageComponent } from './pages/finances-page/finances-page.component';
import { PartnerPageComponent } from './pages/partner-page/partner-page.component';
import { SepaPageComponent } from './pages/sepa-page/sepa-page.component';
import { PlantSelfPageComponent } from './pages/plant-self-page/plant-self-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page/profile-page.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { FactsPageComponent } from './pages/facts-page/facts-page/facts-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { OfferProjectPageComponent } from './pages/offer-project-page/offer-project-page.component';
import { VerifyRegistrationPageComponent } from './pages/verify-registration-page/verify-registration-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { GiftRedeemPageComponent } from './pages/gift-redeem-page/gift-redeem-page.component';
import { CertificateFindPageComponent } from './pages/certificate-find-page/certificate-find-page.component';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { TermsPageComponent } from './pages/terms-page/terms-page.component';
import { AwardsPageComponent } from './pages/awards-page/awards-page.component';
import { EditTeamPageComponent } from './pages/edit-team-page/edit-team-page.component';

export const backofficeRoutes: Routes = [
  { path: '', component: UserOverviewComponent },
  { path: 'user', component: UserOverviewComponent },
  { path: 'carts', component: CartsOverviewComponent },
  { path: 'projects', component: ProjectsOverviewComponent },
  { path: 'content', component: ContentOverviewComponent },
  { path: 'events', component: EventsOverviewComponent },
  { path: 'treetypes', component: TreetypesOverviewComponent },
  { path: 'plantForUser', component: PlantForUserComponent },
  { path: 'transferTrees', component: TransferTreesComponent },
];

export const userRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projectReports', component: ProjectReportsOverviewPageComponent },
  { path: 'project/:projectName', component: ProjectPageComponent },
  { path: 'user/:username', component: ProfilePageComponent },
  { path: 'editProfile/:username', component: EditProfilePageComponent },
  { path: 'editTeam/:teamName', component: EditTeamPageComponent },
  { path: 'team/:teamname', component: TeamPageComponent },
  { path: 'plant', component: PlantProposalPageComponent },
  { path: 'plantSelf', component: PlantSelfPageComponent },
  { path: 'plantbag', component: PlantbagPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'forgotPassword', component: ForgotPasswordPageComponent },
  { path: 'password_reset', component: ResetPasswordPageComponent },
  { path: 'userActivation', pathMatch: 'full', component: VerifyRegistrationPageComponent },
  { path: 'blog', component: BlogOverviewPageComponent },
  { path: 'blog/:id', component: BlogArticlePageComponent },
  { path: 'facts', component: FactsPageComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'awards', component: AwardsPageComponent },
  { path: 'finances', component: FinancesPageComponent },
  { path: 'terms', component: TermsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'partner', component: PartnerPageComponent },
  { path: 'press', component: PrivacyPageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'ranking', component: RankingPageComponent },
  { path: 'paymentOptions', component: PaymentOptionsPageComponent },
  { path: 'sepa', component: SepaPageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'offerArea', component: OfferProjectPageComponent },
  { path: 'gift/redeem', component: GiftRedeemPageComponent },
  { path: 'certificate/find/:id', component: CertificateFindPageComponent },
];

const routes: Routes = [
  { path: '', component: UserRouterOutletComponent, children: userRoutes },
  {
    path: 'backOffice2022',
    component: BackOfficeRouterOutletComponent,
    children: backofficeRoutes,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UtilModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
