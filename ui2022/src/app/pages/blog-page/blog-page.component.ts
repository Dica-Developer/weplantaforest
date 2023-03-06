import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.state';
import { loadBlogArticles, selectBlogArticles } from 'src/app/store/blog.store';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  type: string = 'all';
  lang: string;
  blogArticles$ = this.store.select(selectBlogArticles);

  constructor(private store: Store<AppState>, private translateService: TranslateService) {
    if (this.translateService.currentLang === 'de') {
      this.lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      this.lang = 'ENGLISH';
    }
    this.store.dispatch(loadBlogArticles({ language: this.lang }));
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  setType(event: any) {
    this.type = event;
  }
}
