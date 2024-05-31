import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-privacy-page',
    templateUrl: './privacy-page.component.html',
    styleUrls: ['./privacy-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgFor,
        TranslateModule,
    ],
})
export class PrivacyPageComponent implements OnInit {
  privacyPolicy;

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contentService
      .getInfrastructureArticle('PRIVACY', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.privacyPolicy = res;
      });
  }
}
