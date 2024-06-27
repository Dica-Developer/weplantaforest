import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgFor,
        NgIf,
        TranslateModule,
    ],
})
export class AboutPageComponent implements OnInit {
  aboutUs: any[] = [];
  articleImageUrls: any[] = [];

  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService
      .getInfrastructureArticle('ABOUT_US', this.textHelper.getCurrentLanguage())
      .subscribe((res:any) => {
        this.aboutUs = res;
        for (let i = 0; i < this.aboutUs.length; i++) {
          let images = {mainImageUrl: '', paragraphImageUrls: []};
          images.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + this.aboutUs[i].id + '/' + encodeURI(this.aboutUs[i].imageFileName);
          for (let j = 0; j < this.aboutUs[i].paragraphs.length; j++) {
            images.paragraphImageUrls.push(environment.backendArticleManagerUrl + '/article/image/' + this.aboutUs[i].id + '/' + encodeURI(this.aboutUs[i].paragraphs[j].imageFileName));
          }
          this.articleImageUrls.push(images);
        }
      });
  }
}
