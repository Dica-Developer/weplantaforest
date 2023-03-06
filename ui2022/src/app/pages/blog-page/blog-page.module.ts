import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';
import { BlogArticleTileComponent } from './components/blog-article-tile/blog-article-tile.component';
import { BlogOverviewPageComponent } from './blog-overview-page/blog-overview-page.component';
import { BlogArticlePageComponent } from './blog-article-page/blog-article-page.component';
import { BlogArticleDescriptionComponent } from './components/blog-article-description/blog-article-description.component';
import { BlogArticleHeaderComponent } from './components/blog-article-header/blog-article-header.component';

@NgModule({
  declarations: [
    BlogOverviewPageComponent,
    BlogHeaderComponent,
    BlogArticleTileComponent,
    BlogArticlePageComponent,
    BlogArticleDescriptionComponent,
    BlogArticleHeaderComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [BlogOverviewPageComponent, BlogArticlePageComponent],
})
export class BlogPageModule {}
