import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { UtilModule } from '../../util/util.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, UtilModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
