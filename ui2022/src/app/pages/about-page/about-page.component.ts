import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  lang: string;
  aboutUs;
  mainImageUrl: string;
  paragraphImgUrls: string[] = [];
  constructor(private textHelper: TextHelper, private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService
      .getInfrastructureArticle('ABOUT_US', this.textHelper.getCurrentLanguage())
      .subscribe((res) => {
        this.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + res[0].id + '/' + encodeURI(res[0].imageFileName);
        this.aboutUs = res;
        for (let i = 0; i < this.aboutUs[0].paragraphs.length; i++) {
          this.paragraphImgUrls.push(environment.backendArticleManagerUrl + '/article/image/' + res[0].id + '/' + encodeURI(this.aboutUs[0].paragraphs[i].imageFileName));
        }
      });
  }
}
