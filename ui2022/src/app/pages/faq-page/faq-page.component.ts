import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent implements OnInit {
  faq;

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.contentService
      .getInfrastructureArticle('FAQ', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.faq = res;
      });
  }
}
