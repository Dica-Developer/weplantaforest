import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contentService
      .getInfrastructureArticle('AWARDS', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.awards = res;
      });
  }
}
