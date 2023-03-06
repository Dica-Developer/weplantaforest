import { Component, Input, OnInit } from '@angular/core';
import { BlogArticle } from 'src/app/store/blog.store';

@Component({
  selector: 'app-blog-article-header',
  templateUrl: './blog-article-header.component.html',
  styleUrls: ['./blog-article-header.component.scss'],
})
export class BlogArticleHeaderComponent implements OnInit {
  @Input() blogArticle: BlogArticle;

  constructor() {}

  ngOnInit(): void {}
}
