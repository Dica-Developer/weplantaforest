import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadBlogArticle, selectBlogArticle } from 'src/app/store/blog.store';
import { BlogArticleDescriptionComponent } from '../components/blog-article-description/blog-article-description.component';
import { BlogArticleHeaderComponent } from '../components/blog-article-header/blog-article-header.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-blog-article-page',
  templateUrl: './blog-article-page.component.html',
  styleUrls: ['./blog-article-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    BlogArticleHeaderComponent,
    BlogArticleDescriptionComponent,
    AsyncPipe,
  ],
})
export class BlogArticlePageComponent implements OnInit {
  blogArticle$ = this.store.select(selectBlogArticle);

  constructor(
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadBlogArticle({ id: +paramMap.get('id') }));
    });
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
  }
}
