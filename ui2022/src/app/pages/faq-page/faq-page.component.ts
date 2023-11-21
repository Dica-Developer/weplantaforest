import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent implements OnInit {
  faq: any[] = [];
  faqOverview: any = {};

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.contentService
      .getInfrastructureArticle('FAQ', this.textHelper.getCurrentLanguage())
      .subscribe((res: any[]) => {
        this.faq = res;
        this.sortEntriesbyNumberInTitle();
      });
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

  scrollTo(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }
}
