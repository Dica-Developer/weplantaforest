import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss'],
})
export class TermsPageComponent implements OnInit {
  lang: string;
  terms;

  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.contentService.getInfrastructureArticle('TERMS', this.lang).subscribe((res) => {
      this.terms = res;
    });
  }
}
