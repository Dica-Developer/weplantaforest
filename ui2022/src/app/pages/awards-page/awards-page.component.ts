import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    TranslateModule,
  ],
})
export class AwardsPageComponent implements OnInit {
  awards;

  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.contentService
      .getInfrastructureArticle('AWARDS', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.awards = res;
      });
  }
}
