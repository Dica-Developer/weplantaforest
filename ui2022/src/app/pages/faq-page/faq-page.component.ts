import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    TranslateModule,
  ],
})
export class FaqPageComponent implements OnInit, OnDestroy {
  faq: any[] = [];
  faqOverview: any = {};
  currentlyVisibleFaq: any = null;
  faqSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.faqSub = this.contentService
      .getInfrastructureArticle('FAQ', this.textHelper.getCurrentLanguage())
      .subscribe((res: any[]) => {
        this.faq = res;
        this.sortEntriesbyNumberInTitle();
        this.selectFaq(this.faq[0]);
      });
  }

  selectFaq(faq: any) {
    this.currentlyVisibleFaq = faq;
    this.platformHelper.scrollTop()
  }

  sortEntriesbyNumberInTitle() {
    for (const entry of this.faq) {
      let index = entry.title.substring(0, entry.title.indexOf('.'));
      if (index === '') {
        this.faqOverview = entry;
        index = 0;
      }
      entry.index = parseInt(index);
    }
    this.faq = this.faq.sort((a, b) => {
      return a.index > b.index ? 1 : b.index > a.index ? -1 : 0;
    });
    // filter out the entry without index, which is the entry with all questions
    this.faq = this.faq.filter((entry) => entry.index !== 0);
  }

  ngOnDestroy() {
    this.faqSub?.unsubscribe();
  }
}
