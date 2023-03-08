import { Component, Input, OnInit } from '@angular/core';
import { BlogArticle } from 'src/app/store/blog.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-article-header',
  templateUrl: './blog-article-header.component.html',
  styleUrls: ['./blog-article-header.component.scss'],
})
export class BlogArticleHeaderComponent implements OnInit {
  @Input() blogArticle: BlogArticle;
  imageUrl;

  constructor() {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendUrl +
      '/article/image/' +
      encodeURI(this.blogArticle.imageFileName) +
      '/300/300';
  }
}
