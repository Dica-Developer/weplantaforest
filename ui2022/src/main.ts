import { enableProdMode, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MY_FORMATS, createTranslateLoader } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { EffectsModule } from '@ngrx/effects';
import { infrastructureReducerFn, InfrastructureEffects } from './app/store/infrastructure.store';
import { contactReducerFn, ContactEffects } from './app/store/contact.store';
import { paymentReducerFn, PaymentEffects } from './app/store/payment.store';
import { plantProposalReducerFn, PlantProposalEffects } from './app/store/plant.store';
import { blogReducerFn, BlogEffects } from './app/store/blog.store';
import { searchReducerFn, SearchEffects } from './app/store/search.store';
import { projectsReportReducerFn, ProjectReportsEffects } from './app/store/project-report.store';
import { rankingReducerFn, RankingEffects } from './app/store/ranking.store';
import { treeReducerFn, TreeEffects } from './app/store/tree.store';
import { plantbagReducerFn, PlantbagEffects } from './app/store/plantbag.store';
import { teamReducerFn, TeamEffects } from './app/store/team.store';
import { eventsReducerFn, EventsEffects } from './app/store/events.store';
import { contentReducerFn, ContentEffects } from './app/store/content.store';
import { successMessageReducerFn } from './app/store/success-message.state';
import { errorsReducerFn } from './app/store/error.state';
import { treeTypeReducerFn, TreeTypeEffects } from './app/store/treeType.store';
import { projectsReducerFn, ProjectsEffects } from './app/store/project.store';
import { userReducerFn, UserEffects } from './app/store/user.store';
import { cartsReducerFn, CartsEffects } from './app/store/carts.store';
import { profileReducerFn, ProfileEffects } from './app/store/profile.store';
import { authReducerFn, AuthEffects } from './app/store/auth.store';
import { StoreModule } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ErrorInterceptor } from './app/services/http-interceptors/http.interceptor';
import { AuthGuard } from './app/util/auth.guard';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { TokenInterceptor } from './app/services/http-interceptors/token.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PaginatorIntlService } from './app/util/material/paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      AppRoutingModule,
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
      ]), MatNativeDateModule, AgGridModule, FormsModule, LeafletModule, LeafletDrawModule, TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
      NgxSliderModule),
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
    provideAnimations()
  ]
})
  .catch(err => console.error(err));
