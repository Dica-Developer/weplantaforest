import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    TranslateModule,
  ],
})
export class TermsPageComponent implements OnInit {
  terms;
  termsSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.termsSub = this.contentService
      .getInfrastructureArticle('TERMS', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        this.terms = []
        this.terms = res.slice().reverse();
      });
  }

  ngOnDestroy() {
    this.termsSub.unsubscribe()
  }
}
