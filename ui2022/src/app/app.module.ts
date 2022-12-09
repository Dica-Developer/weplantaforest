import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AuthEffects, authReducerFn } from './store/auth.store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UtilModule } from './util/util.module';
import { profileReducerFn, ProfileEffects } from './store/profile.store';
import { projectsReportReducerFn, ProjectReportsEffects } from './store/project-report.store';
import { TokenInterceptor } from './services/http-interceptors/token.interceptor';
import { cartsReducerFn, CartsEffects } from './store/carts.store';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { userReducerFn, UserEffects } from './store/user.store';
import { projectsReducerFn, ProjectsEffects } from './store/project.store';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { TreeTypeEffects, treeTypeReducerFn } from './store/treeType.store';
import { errorsReducerFn } from './store/error.state';
import { successMessageReducerFn } from './store/success-message.state';
import { contentReducerFn, ContentEffects } from './store/content.store';
import { eventsReducerFn, EventsEffects } from './store/events.store';
import { teamReducerFn, TeamEffects } from './store/team.store';
import { plantbagReducerFn, PlantbagEffects } from './store/plantbag.store';
import { AuthGuard } from './util/auth.guard';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ErrorInterceptor } from './services/http-interceptors/http.interceptor';
import { AppCookieService } from './util/cookie.service';
import { CookieService } from 'ngx-cookie-service';
import { PagesModule } from './pages/pages.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TreeEffects, treeReducerFn } from './store/tree.store';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { UserRouterOutletComponent } from './router-outlets/user-router-outlet/user-router-outlet.component';
import { BackOfficeRouterOutletComponent } from './router-outlets/back-office-router-outlet/back-office-router-outlet.component';
import { RankingEffects, rankingReducerFn } from './store/ranking.store';

export const MY_FORMATS = {
  parse: {
    // dateInput: 'LL',
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'tinesoft.github.io',
  },
  position: 'bottom',
  theme: 'block',
  palette: {
    popup: {
      background: '#4f3a2c',
      text: '#ffffff',
      link: '#ffffff',
    },
    button: {
      background: '#82ab1f',
      text: '#ffffff',
      border: 'transparent',
    },
  },
  type: 'opt-out',
  content: {
    message: 'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com',
    policy: 'Cookie Policy',
  },
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [AppComponent, UserRouterOutletComponent, BackOfficeRouterOutletComponent],
  imports: [
    CommonModule,
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
      content: contentReducerFn,
      event: eventsReducerFn,
      teams: teamReducerFn,
      plantbag: plantbagReducerFn,
      trees: treeReducerFn,
      ranking: rankingReducerFn,
      projectReports: projectsReportReducerFn,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProfileEffects,
      CartsEffects,
      UserEffects,
      ProjectsEffects,
      TreeTypeEffects,
      ContentEffects,
      EventsEffects,
      TeamEffects,
      PlantbagEffects,
      TreeEffects,
      RankingEffects,
      ProjectReportsEffects,
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
    LeafletDrawModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // {provide: APP_BASE_HREF, useValue:'backOffice2022'}
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AppCookieService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
