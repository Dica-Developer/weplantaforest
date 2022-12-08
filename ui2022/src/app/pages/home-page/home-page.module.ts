import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { UtilModule } from '../../util/util.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HomePageComponent, HeaderComponent],
  imports: [CommonModule, UtilModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
