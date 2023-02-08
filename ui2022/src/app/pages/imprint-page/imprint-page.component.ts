import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  lang: string;
  imprints;
  constructor(private contentService: ContentService, private translateService: TranslateService) {}

  ngOnInit(): void {
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.contentService.getInfrastructureArticle('IMPRESS', this.lang).subscribe((res) => {
      this.imprints = res;
    });
  }
}
