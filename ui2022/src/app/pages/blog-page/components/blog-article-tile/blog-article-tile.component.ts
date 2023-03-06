import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-article-tile',
  templateUrl: './blog-article-tile.component.html',
  styleUrls: ['./blog-article-tile.component.scss'],
})
export class BlogArticleTileComponent implements OnInit {
  @Input() blogArticle;
  imgUrl: string;
  progress: number;
  description: string;
  constructor(
    private textHelper: TextHelper,
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log(this.blogArticle);

    this.imgUrl =
      environment.backendUrl +
      '/article/image/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/400/800';
    this.description = this.textHelper.getTextForLanguage(
      this.blogArticle.intro,
      this.translateService.currentLang,
    );
  }

  route() {
    this.router.navigate(['/blog/' + this.blogArticle.id]);
  }
}
