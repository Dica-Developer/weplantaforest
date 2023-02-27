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
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { PlantProposalPageComponent } from './pages/plant-proposal-page/plant-proposal-page.component';
import { PlantbagPageComponent } from './pages/plantbag-page/plantbag-page.component';
import { NewsletterComponent } from './util/common-components/newsletter/newsletter.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

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
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'team/:teamname', component: TeamPageComponent },
  { path: 'plant', component: PlantProposalPageComponent },
  { path: 'plantbag', component: PlantbagPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgotPassword', component: ForgotPasswordPageComponent },
  { path: 'password_reset', component: ResetPasswordPageComponent },
  { path: 'blog', component: PrivacyPageComponent },
  { path: 'facts', component: PrivacyPageComponent },
  { path: 'finances', component: PrivacyPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'about', component: PrivacyPageComponent },
  { path: 'partner', component: PrivacyPageComponent },
  { path: 'press', component: PrivacyPageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'ranking', component: RankingPageComponent },
];

const routes: Routes = [
  { path: '', component: UserRouterOutletComponent, children: userRoutes },
  {
    path: 'backOffice2022',
    component: BackOfficeRouterOutletComponent,
    children: backofficeRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UtilModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
