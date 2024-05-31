import { Component, Input, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BlogArticle } from 'src/app/store/blog.store';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { SafeHtmlPipe } from '../../../../util/common-components/safehtml.pipe';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-blog-article-description',
    templateUrl: './blog-article-description.component.html',
    styleUrls: ['./blog-article-description.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        RouterLink,
        TranslateModule,
        SafeHtmlPipe,
    ],
})
export class BlogArticleDescriptionComponent implements OnInit {
  @Input() blogArticle: BlogArticle;
  intro: string;
  descriptions: string[];
  imageUrl: string;
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendArticleManagerUrl +
      '/article/image/' +
      this.blogArticle.id +
      '/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/800/600';

    this.descriptions = [];

    for (let paragraph of this.blogArticle.paragraphs) {
      let text = this.textHelper.getTextForLanguage(
        paragraph.text,
        this.translateService.currentLang,
      );
      this.descriptions.push(text);
    }
    this.intro = this.textHelper.getTextForLanguage(
      this.blogArticle.intro,
      this.translateService.currentLang,
    );
  }

  getText(text: string) {
    return this.textHelper.getTextForLanguage(
      text,
      this.translateService.currentLang,
    );
  }

  getParagraphs() {
    return this.blogArticle.paragraphs;
  }

  getImageUrl(imageName: string) {
    return  environment.backendArticleManagerUrl +
    '/article/image/' +
    this.blogArticle.id +
    '/' +
    encodeURI(imageName) +
    '/800/600';
  }
}
