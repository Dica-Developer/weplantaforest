import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss'],
})
export class TermsPageComponent implements OnInit {
  terms;

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contentService
      .getInfrastructureArticle('TERMS', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.terms = res;
      });
  }
}
