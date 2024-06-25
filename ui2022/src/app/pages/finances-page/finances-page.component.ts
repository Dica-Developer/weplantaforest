import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { AppState } from 'src/app/store/app.state';
import { SafeHtmlPipe } from '../../util/common-components/safehtml.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { LanguageHelper } from 'src/app/util/helper/language.helper';

@Component({
  selector: 'app-finances-page',
  templateUrl: './finances-page.component.html',
  styleUrls: ['./finances-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    TranslateModule,
    SafeHtmlPipe,
  ],
})
export class FinancesPageComponent implements OnInit {
  lang: string;
  finances;
  currentlySelectedYear: any = null;
  financeSub: Subscription;

  constructor(
    private contentService: ContentService,
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
    private languageHelper: LanguageHelper
  ) {}

  ngOnInit(): void {
    if (this.languageHelper.getUserLanguage() === 'de' || this.languageHelper.getUserLanguage() === 'DEUTSCH') {
      this.lang = 'DEUTSCH';
    } else {
      this.lang = 'ENGLISH';
    }
    this.financeSub = this.contentService
      .getInfrastructureArticle('FINANCIALS', this.lang)
      .subscribe((res) => {
        this.finances = res;
        this.currentlySelectedYear = this.finances[0];
      });
    this.platformHelper.scrollTop()
  }

  selectYear(financeArticle: any) {
    this.currentlySelectedYear = financeArticle;
    this.platformHelper.scrollTop()
  }

  ngOnDestroy(): void {
    this.financeSub?.unsubscribe();
  }

}
