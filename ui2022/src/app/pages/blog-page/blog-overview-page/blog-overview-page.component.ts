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

@Component({
  selector: 'app-blog-overview-page',
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
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
