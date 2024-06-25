import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { LanguageHelper } from 'src/app/util/helper/language.helper';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    TranslateModule,
  ],
})
export class ImprintPageComponent implements OnInit, OnDestroy {
  imprints;

  lang: string;
  imprintSub: Subscription;
  languageSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>,
    private languageHelper: LanguageHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    if (this.languageHelper.getUserLanguage() === 'ENGLISH' || this.languageHelper.getUserLanguage() === 'en') {
      this.lang = 'ENGLISH';
    } else {
      this.lang = 'DEUTSCH';
    }
    this.imprintSub = this.contentService
      .getInfrastructureArticle('IMPRESS', this.lang)
      .subscribe((res) => {
        this.imprints = res;
      });
  }

  ngOnDestroy(): void {
    this.imprintSub?.unsubscribe();
    this.languageSub?.unsubscribe();
  }
}
