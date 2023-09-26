import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.scss'],
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
