import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeRouterOutletComponent } from './back-office-page/back-office-router-outlet/back-office-router-outlet.component';
import { CartsOverviewComponent } from './back-office-page/carts/carts-overview/carts-overview.component';
import { ContentOverviewComponent } from './back-office-page/content/content-overview/content-overview.component';
import { EventsOverviewComponent } from './back-office-page/events/events-overview/events-overview.component';
import { PlantForUserComponent } from './back-office-page/plant-for-user/plant-for-user/plant-for-user.component';
import { ProjectsOverviewComponent } from './back-office-page/projects/projects-overview/projects-overview.component';
import { TransferTreesComponent } from './back-office-page/transfer-trees/transfer-trees/transfer-trees.component';
import { TreetypesOverviewComponent } from './back-office-page/treeTypes/treetypes-overview/treetypes-overview.component';
import { UserOverviewComponent } from './back-office-page/user/user-overview/user-overview.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { AuthGuard } from "./util/auth.guard";
import { UtilModule } from './util/util.module';

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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgotPassword', component: ForgotPasswordPageComponent },
  { path: 'password_reset', component: ResetPasswordPageComponent },
  {
    path: 'backOffice2022',
    component: BackOfficeRouterOutletComponent,
    children: backofficeRoutes,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UtilModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
