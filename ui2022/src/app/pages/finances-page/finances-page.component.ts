import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { AppState } from 'src/app/store/app.state';
import { selectUserLanguage } from '../../store/profile.store';

@Component({
  selector: 'app-finances-page',
  templateUrl: './finances-page.component.html',
  styleUrls: ['./finances-page.component.scss'],
})
export class FinancesPageComponent implements OnInit, OnDestroy {
  lang: string;
  finances;
  currentlySelectedYear: any = null;
  languageSub: Subscription;
  financeSub: Subscription;

  constructor(
    private contentService: ContentService,
    private translateService: TranslateService,
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
          console.log(res)
          this.currentlySelectedYear = this.finances[0];
        });
    });
    window.scrollTo(0, 0);
  }

  selectYear(financeArticle: any) {
    this.currentlySelectedYear = financeArticle;
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
