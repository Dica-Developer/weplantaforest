import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-finances-page',
  templateUrl: './finances-page.component.html',
  styleUrls: ['./finances-page.component.scss'],
})
export class FinancesPageComponent implements OnInit {
  lang: string;
  finances;

  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.contentService.getInfrastructureArticle('FINANCIALS', this.lang).subscribe((res) => {
      this.finances = res;
    });
  }
}
