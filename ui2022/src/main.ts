import { enableProdMode, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
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
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

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

bootstrapApplication(AppComponent, appConfig
)
  .catch(err => console.error(err));
