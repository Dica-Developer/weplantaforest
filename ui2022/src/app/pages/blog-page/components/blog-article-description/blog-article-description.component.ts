import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BlogArticle } from 'src/app/store/blog.store';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-article-description',
  templateUrl: './blog-article-description.component.html',
  styleUrls: ['./blog-article-description.component.scss'],
})
export class BlogArticleDescriptionComponent implements OnInit {
  @Input() blogArticle: BlogArticle;
  intro: string;
  descriptions: string[];
  imageUrl: string;
  constructor(private textHelper: TextHelper, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendUrl +
      '/article/image/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/300/300';

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
}
