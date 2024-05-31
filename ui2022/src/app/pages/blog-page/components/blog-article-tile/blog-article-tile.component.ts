import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-blog-article-tile',
    templateUrl: './blog-article-tile.component.html',
    styleUrls: ['./blog-article-tile.component.scss'],
    standalone: true,
    imports: [DatePipe],
})
export class BlogArticleTileComponent implements OnInit {
  @Input() blogArticle;
  imgUrl: string;
  progress: number;
  description: string;
  backgroundImgUrl: string = 'none';
  zIndex: number = 1;

  constructor(
    private textHelper: TextHelper,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.imgUrl =
      environment.backendArticleManagerUrl +
      '/article/image/' +
      this.blogArticle.id +
      '/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/1000/500';
    this.description = this.textHelper.getTextForLanguage(
      this.blogArticle.intro,
      this.translateService.currentLang,
    );
  }

  showBackgroundImage(check: boolean) {
    if (check && this.blogArticle.imageFileName) {
      this.backgroundImgUrl = 'url(' + this.imgUrl + ')';
      this.zIndex = -1;
    } else {
      this.backgroundImgUrl = 'none';
      this.zIndex = 1;
    }
  }

  route() {
    this.router.navigate(['/blog/' + this.blogArticle.id]);
  }
}
