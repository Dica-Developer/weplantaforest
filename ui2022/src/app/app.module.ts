import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './home-page/home-page.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects, authReducerFn } from './store/auth.store';
import { LoginPageModule } from './login-page/login-page.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UtilModule } from './util/util.module';
import { BackofficePageModule } from './back-office-page/back-office-page.module';
import { profileReducerFn, ProfileEffects } from './store/profile.store';
import { TokenInterceptor } from './services/http-interceptors/token.interceptor';
import { cartsReducerFn, CartsEffects } from './store/carts.store';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { userReducerFn, UserEffects } from './store/user.store';
import { projectsReducerFn, ProjectsEffects } from './store/project.store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomePageModule,
    LoginPageModule,
    BackofficePageModule,
    UtilModule,
    StoreModule.forRoot({
      auth: authReducerFn,
      profile: profileReducerFn,
      carts: cartsReducerFn,
      user: userReducerFn,
      projects: projectsReducerFn
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      CartsEffects,
      UserEffects,
      ProjectsEffects
    ]),
    MatNativeDateModule,
    AgGridModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
