import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-partner-page',
  templateUrl: './partner-page.component.html',
  styleUrls: ['./partner-page.component.scss'],
})
export class PartnerPageComponent implements OnInit {
  lang: string;
  partners;

  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.contentService.getInfrastructureArticle('PARTNER', this.lang).subscribe((res) => {
      this.partners = res;
    });
  }
}
