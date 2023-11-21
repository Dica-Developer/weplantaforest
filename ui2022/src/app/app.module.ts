import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
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
import { ErrorInterceptor } from './services/http-interceptors/http.interceptor';
import { PagesModule } from './pages/pages.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TreeEffects, treeReducerFn } from './store/tree.store';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { UserRouterOutletComponent } from './router-outlets/user-router-outlet/user-router-outlet.component';
import { BackOfficeRouterOutletComponent } from './router-outlets/back-office-router-outlet/back-office-router-outlet.component';
import { RankingEffects, rankingReducerFn } from './store/ranking.store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SearchEffects, searchReducerFn } from './store/search.store';
import { PlantProposalEffects, plantProposalReducerFn } from './store/plant.store';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BlogEffects, blogReducerFn } from './store/blog.store';
import { PaymentEffects, paymentReducerFn } from './store/payment.store';
import { ContactEffects, contactReducerFn } from './store/contact.store';
import { NgChartsModule } from 'ng2-charts';
import { InfrastructureEffects, infrastructureReducerFn } from './store/infrastructure.store';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorIntlService } from './util/material/paginator-intl';

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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeDe, 'de-DE', localeDeExtra);
registerLocaleData(localeEn, 'en-EN', localeEnExtra);

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
      authState: authReducerFn,
      profileState: profileReducerFn,
      cartsState: cartsReducerFn,
      userState: userReducerFn,
      projectsState: projectsReducerFn,
      treeTypesState: treeTypeReducerFn,
      errorsState: errorsReducerFn,
      successMessagesState: successMessageReducerFn,
      contentState: contentReducerFn,
      eventState: eventsReducerFn,
      teamsState: teamReducerFn,
      plantbagState: plantbagReducerFn,
      treesState: treeReducerFn,
      rankingState: rankingReducerFn,
      projectReportsState: projectsReportReducerFn,
      searchState: searchReducerFn,
      blogState: blogReducerFn,
      plantProposalState: plantProposalReducerFn,
      paymentState: paymentReducerFn,
      contactState: contactReducerFn,
      infrastructureState: infrastructureReducerFn,
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
      SearchEffects,
      PlantProposalEffects,
      BlogEffects,
      PaymentEffects,
      ContactEffects,
      InfrastructureEffects,
      MomentDateModule,
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
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgScrollbarModule,
    NgxSliderModule,
    NgChartsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorIntlService();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // {provide: APP_BASE_HREF, useValue:'backOffice2022'}
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // AppCookieService,
    // CookieService,
    {
      provide: LOCALE_ID,
      useValue: 'de-DE', // 'de-DE' for Germany, 'fr-FR' for France ...
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
