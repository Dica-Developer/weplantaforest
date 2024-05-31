import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { AppState } from 'src/app/store/app.state';
import { selectUserLanguage } from '../../store/profile.store';
import { SafeHtmlPipe } from '../../util/common-components/safehtml.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

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
export class FinancesPageComponent implements OnInit, OnDestroy {
  lang: string;
  finances;
  currentlySelectedYear: any = null;
  languageSub: Subscription;
  financeSub: Subscription;

  constructor(
    private contentService: ContentService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.languageSub = this.store.select(selectUserLanguage).subscribe((res) => {
      if (res === 'de' || res === 'DEUTSCH') {
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
    });
    window.scrollTo(0, 0);
  }

  selectYear(financeArticle: any) {
    this.currentlySelectedYear = financeArticle;
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.languageSub?.unsubscribe();
    this.financeSub?.unsubscribe();
  }

  scrollTo(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}
