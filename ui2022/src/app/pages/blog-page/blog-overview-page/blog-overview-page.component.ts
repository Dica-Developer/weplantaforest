import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadBlogArticles,
  selectBlogArticles,
  selectBlogArticlesAmount,
} from 'src/app/store/blog.store';
import { OfferAreaComponent } from '../../../util/common-components/offer-area/offer-area.component';
import { NewsletterComponent } from '../../../util/common-components/newsletter/newsletter.component';
import { MatIcon } from '@angular/material/icon';
import { BlogArticleTileComponent } from '../components/blog-article-tile/blog-article-tile.component';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { BlogHeaderComponent } from '../components/blog-header/blog-header.component';

@Component({
    selector: 'app-blog-overview-page',
    templateUrl: './blog-overview-page.component.html',
    styleUrls: ['./blog-overview-page.component.scss'],
    standalone: true,
    imports: [
        BlogHeaderComponent,
        NgFor,
        BlogArticleTileComponent,
        NgIf,
        MatIcon,
        NewsletterComponent,
        OfferAreaComponent,
        AsyncPipe,
    ],
})
export class BlogOverviewPageComponent implements OnInit {
  type: string = 'all';
  lang: string;

  blogArticles$ = this.store.select(selectBlogArticles);

  blogArticlesAmountSub: Subscription;
  blogArticlesAmount: number;

  constructor(private store: Store<AppState>, private translateService: TranslateService) {
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.store.dispatch(loadBlogArticles({ pageSize: 10, language: this.lang }));
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.blogArticlesAmountSub = this.store.select(selectBlogArticlesAmount).subscribe((res) => {
      this.blogArticlesAmount = res;
    });
  }

  loadAllRemainingArticles() {
    this.store.dispatch(
      loadBlogArticles({ pageSize: this.blogArticlesAmount, language: this.lang }),
    );
  }
}
