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
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from "@asymmetrik/ngx-leaflet-draw";
import { TreeTypeEffects, treeTypeReducerFn } from './store/treeType.store';
import { errorsReducerFn } from './store/error.state';
import { successMessageReducerFn } from './store/success-message.state';
import { contentReducerFn, ContentEffects } from './store/content.store';

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
      projects: projectsReducerFn,
      treeTypes: treeTypeReducerFn,
      errors: errorsReducerFn,
      successMessages: successMessageReducerFn,
      content: contentReducerFn
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      CartsEffects,
      UserEffects,
      ProjectsEffects,
      TreeTypeEffects,
      ContentEffects
    ]),
    MatNativeDateModule,
    AgGridModule.forRoot(),
    FormsModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
    LeafletModule,
    LeafletDrawModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
