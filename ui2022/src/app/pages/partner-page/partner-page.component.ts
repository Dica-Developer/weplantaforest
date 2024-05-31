import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

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
export class PartnerPageComponent implements OnInit {
  partners: any[] = [];
  articleImageUrls: any[] = [];

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.contentService
      .getInfrastructureArticle('PARTNER', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        this.partners = res;
        for (let i = 0; i < this.partners.length; i++) {
          let images = {mainImageUrl: '', paragraphImageUrls: []};
          if (this.partners[i].imageFileName === null) {
            images.mainImageUrl = '';
          } else {
            images.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + this.partners[i].id + '/' + encodeURI(this.partners[i].imageFileName);
          }
          for (let j = 0; j < this.partners[i].paragraphs.length; j++) {
            images.paragraphImageUrls.push(environment.backendArticleManagerUrl + '/article/image/' + this.partners[i].id + '/' + encodeURI(this.partners[i].paragraphs[j].imageFileName));
          }
          this.articleImageUrls.push(images);
        }
      });
  }
}
