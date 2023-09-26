import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit {
  imprints;

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    this.textHelper.getCurrentLanguage();
    this.contentService
      .getInfrastructureArticle('IMPRESS', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.imprints = res;
      });
  }
}
