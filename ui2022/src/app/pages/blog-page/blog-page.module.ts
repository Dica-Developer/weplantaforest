import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';
import { BlogPageComponent } from './blog-page.component';
import { BlogArticleTileComponent } from './components/blog-article-tile/blog-article-tile.component';

@NgModule({
  declarations: [BlogPageComponent, BlogHeaderComponent, BlogArticleTileComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [BlogPageComponent],
})
export class BlogPageModule {}
