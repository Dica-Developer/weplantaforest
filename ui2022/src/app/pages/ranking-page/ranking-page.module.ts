import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RankingPageComponent } from './ranking-page.component';
import { RouterModule } from '@angular/router';
import { RankingItemComponent } from './components/ranking-item/ranking-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RankingPageComponent, RankingItemComponent],
  imports: [CommonModule, UtilModule, RouterModule, FormsModule],
  exports: [RankingPageComponent],
})
export class RankingPageModule {}
