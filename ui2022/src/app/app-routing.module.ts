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
  { path: 'ranking', component: RankingPageComponent },
];

const routes: Routes = [
  { path: '', component: UserRouterOutletComponent, children: userRoutes },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgotPassword', component: ForgotPasswordPageComponent },
  { path: 'password_reset', component: ResetPasswordPageComponent },
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
