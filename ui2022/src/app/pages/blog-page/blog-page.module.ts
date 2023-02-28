import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';

@NgModule({
  declarations: [BlogPageComponent, BlogHeaderComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [BlogPageComponent],
})
export class BlogPageModule {}
