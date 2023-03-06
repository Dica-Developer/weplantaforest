import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadBlogArticle, selectBlogArticle } from 'src/app/store/blog.store';

@Component({
  selector: 'app-blog-article-page',
  templateUrl: './blog-article-page.component.html',
  styleUrls: ['./blog-article-page.component.scss'],
})
export class BlogArticlePageComponent implements OnInit {
  blogArticle$ = this.store.select(selectBlogArticle);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadBlogArticle({ id: +paramMap.get('id') }));
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
