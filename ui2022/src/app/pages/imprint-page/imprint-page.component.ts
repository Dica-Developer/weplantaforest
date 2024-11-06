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
import { TextHelper } from 'src/app/util/helper/text.helper';

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

  imprintSub: Subscription;
  languageSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.imprintSub = this.contentService
      .getInfrastructureArticle('IMPRESS', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        // reverse order for sorting
        this.imprints = []
        this.imprints = res.slice().reverse();
      });
  }

  ngOnDestroy(): void {
    this.imprintSub?.unsubscribe();
    this.languageSub?.unsubscribe();
  }
}
