import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { BlogArticle, loadBlogArticle, selectBlogArticle } from 'src/app/store/blog.store';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';
import { environment } from 'src/environments/environment';
import { Subscription, take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { selectIsUserAdmin } from 'src/app/store/profile.store';
import { loadArticleDetails } from 'src/app/store/content.store';
import { MatIcon } from '@angular/material/icon';
import { SafeHtmlPipe } from 'src/app/util/common-components/safehtml.pipe';

@Component({
  selector: 'app-blog-article-page',
  templateUrl: './blog-article-page.component.html',
  styleUrls: ['./blog-article-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    AsyncPipe,
    TranslateModule,
    NgFor,
    RouterModule,
    SafeHtmlPipe
  ],
})
export class BlogArticlePageComponent implements OnInit {
  blogArticle$ = this.store.select(selectBlogArticle);
  blogArticleSub: Subscription;
  blogArticle: BlogArticle | null = null;
  mainImageUrl: string = '';
  articleImageUrls: string[] = [];
  isAdmin$ = this.store.select(selectIsUserAdmin);

  constructor(
    private store: Store<AppState>,
    private platformHelper: PlatformHelper,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.paramMap.pipe(take(1)).subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadBlogArticle({ id: +paramMap.get('id') }));
    });
  }

  ngOnInit(): void {
    this.blogArticleSub = this.blogArticle$.subscribe((article) => {
      this.articleImageUrls = []
      if (article) {
        this.blogArticle = article;
        this.mainImageUrl = environment.backendArticleManagerUrl + '/article/image/' + article.id + '/' + encodeURI(article.imageFileName);
        for (let j = 0; j < article.paragraphs.length; j++) {
          this.articleImageUrls.push(environment.backendArticleManagerUrl + '/article/image/' + article.id + '/' + encodeURI(article.paragraphs[j].imageFileName));
        }
      }
    });
    this.platformHelper.scrollTop()
  }

  goToEdit() {
    this.store.dispatch(loadArticleDetails({ id: this.blogArticle.id }));
    this.router.navigate(['/backOffice2022/content']);
  }

  ngOnDestroy(): void {
    this.blogArticleSub.unsubscribe();
  }
}
