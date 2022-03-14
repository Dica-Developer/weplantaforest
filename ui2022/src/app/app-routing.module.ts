import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficePageComponent } from './back-office-page/back-office-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UtilModule } from "./util/util.module";

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "backOffice2022", component: BackOfficePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UtilModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
