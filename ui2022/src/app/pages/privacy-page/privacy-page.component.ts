import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { Subscription } from 'rxjs';

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
  privacyPolicy: any;
  privacyPolicySub: Subscription;

  constructor(private platformHelper: PlatformHelper, private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop();
    this.privacyPolicySub = this.contentService
      .getInfrastructureArticle('PRIVACY', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        // reverse order for sorting
        this.privacyPolicy = res.slice().reverse();
      });
  }

  ngOnDestroy() {
    this.privacyPolicySub.unsubscribe();
  }
}
