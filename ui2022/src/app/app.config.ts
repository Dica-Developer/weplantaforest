import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { EffectsModule } from '@ngrx/effects';
import { infrastructureReducerFn, InfrastructureEffects } from './store/infrastructure.store';
import { contactReducerFn, ContactEffects } from './store/contact.store';
import { paymentReducerFn, PaymentEffects } from './store/payment.store';
import { plantProposalReducerFn, PlantProposalEffects } from './store/plant.store';
import { blogReducerFn, BlogEffects } from './store/blog.store';
import { searchReducerFn, SearchEffects } from './store/search.store';
import { projectsReportReducerFn, ProjectReportsEffects } from './store/project-report.store';
import { rankingReducerFn, RankingEffects } from './store/ranking.store';
import { treeReducerFn, TreeEffects } from './store/tree.store';
import { plantbagReducerFn, PlantbagEffects } from './store/plantbag.store';
import { teamReducerFn, TeamEffects } from './store/team.store';
import { eventsReducerFn, EventsEffects } from './store/events.store';
import { contentReducerFn, ContentEffects } from './store/content.store';
import { successMessageReducerFn } from './store/success-message.state';
import { errorsReducerFn } from './store/error.state';
import { treeTypeReducerFn, TreeTypeEffects } from './store/treeType.store';
import { projectsReducerFn, ProjectsEffects } from './store/project.store';
import { userReducerFn, UserEffects } from './store/user.store';
import { cartsReducerFn, CartsEffects } from './store/carts.store';
import { profileReducerFn, ProfileEffects } from './store/profile.store';
import { authReducerFn, AuthEffects } from './store/auth.store';
import { StoreModule } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ErrorInterceptor } from './services/http-interceptors/http.interceptor';
import { AuthGuard } from './util/auth.guard';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { TokenInterceptor } from './services/http-interceptors/token.interceptor';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PaginatorIntlService } from './util/material/paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

export const MY_FORMATS = {
  parse: {
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
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      CommonModule,
      BrowserModule,
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
      AgGridModule,
      FormsModule,
      TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
      NgxSliderModule
    ),
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
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE', // 'de-DE' for Germany, 'fr-FR' for France ...
    },
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(), provideClientHydration()
  ]
};
