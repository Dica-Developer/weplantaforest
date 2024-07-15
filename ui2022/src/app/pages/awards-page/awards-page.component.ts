import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    TranslateModule,
    NgIf
  ],
})
export class AwardsPageComponent implements OnInit {
  awards: any[] = [];
  articleImageUrls: any[] = [];
  articleSub: Subscription;

  constructor(
    private platformHelper: PlatformHelper,
    private textHelper: TextHelper,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
    this.articleSub = this.contentService
      .getInfrastructureArticle('AWARDS', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        this.awards = res;
        for (let i = 0; i < this.awards.length; i++) {
          let images = {mainImageUrl: '', paragraphImageUrls: []};
          if (this.awards[i].imageFileName === null) {
            images.mainImageUrl = '';
          } else {
            images.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + this.awards[i].id + '/' + encodeURI(this.awards[i].imageFileName);
          }
          for (let j = 0; j < this.awards[i].paragraphs.length; j++) {
            images.paragraphImageUrls.push(environment.backendArticleManagerUrl + '/article/image/' + this.awards[i].id + '/' + encodeURI(this.awards[i].paragraphs[j].imageFileName));
          }
          this.articleImageUrls.push(images);
        }
      });
  }

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
  }
}
