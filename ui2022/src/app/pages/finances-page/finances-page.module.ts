import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { FinancesPageComponent } from './finances-page.component';

@NgModule({
  declarations: [FinancesPageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [FinancesPageComponent],
})
export class FinancesPageModule {}
