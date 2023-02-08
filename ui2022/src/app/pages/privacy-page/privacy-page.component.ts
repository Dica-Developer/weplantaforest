import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
})
export class PrivacyPageComponent implements OnInit {
  lang: string;
  privacyPolicy;
  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.contentService.getInfrastructureArticle('PRIVACY', this.lang).subscribe((res) => {
      this.privacyPolicy = res;
    });
  }
}
