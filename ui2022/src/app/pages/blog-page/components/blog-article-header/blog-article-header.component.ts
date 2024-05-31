import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app/store/app.state';
import { BlogArticle } from '../../../../../app/store/blog.store';
import { environment } from '../../../../../environments/environment';
import { selectIsUserAdmin } from '../../../../store/profile.store';
import { loadArticleDetails } from '../../../../store/content.store';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-blog-article-header',
    templateUrl: './blog-article-header.component.html',
    styleUrls: ['./blog-article-header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        MatIcon,
        AsyncPipe,
        TranslateModule,
    ],
})
export class BlogArticleHeaderComponent implements OnInit {
  @Input() blogArticle: BlogArticle;
  imageUrl;
  isAdmin$ = this.store.select(selectIsUserAdmin);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendArticleManagerUrl +
      '/article/image/' +
      this.blogArticle.id +
      '/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/400/300';
  }

  goToEdit() {
    this.store.dispatch(loadArticleDetails({ id: this.blogArticle.id }));
    this.router.navigate(['/backOffice2022/content']);
  }
}
