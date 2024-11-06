import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partner-page',
  templateUrl: './partner-page.component.html',
  styleUrls: ['./partner-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    TranslateModule,
  ],
})
export class PartnerPageComponent implements OnInit, OnDestroy {
  partners: any[] = [];
  articleImageUrls: any[] = [];
  articleSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.articleSub = this.contentService
      .getInfrastructureArticle('PARTNER', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        // reverse order for sorting
        this.partners = res.slice().reverse();
        for (let i = 0; i < this.partners.length; i++) {
          let articleImages = {mainImageUrl: '', paragraphImageUrls: []};
          if (this.partners[i].imageFileName === null) {
            articleImages.mainImageUrl = '';
          } else {
            articleImages.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + this.partners[i].id + '/' + encodeURI(this.partners[i].imageFileName);
          }
          for (let j = 0; j < this.partners[i].paragraphs.length; j++) {
            articleImages.paragraphImageUrls.push(environment.backendArticleManagerUrl + '/article/image/' + this.partners[i].id + '/' + encodeURI(this.partners[i].paragraphs[j].imageFileName));
          }
          this.articleImageUrls.push(articleImages);
        }
      });
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
  }
}
