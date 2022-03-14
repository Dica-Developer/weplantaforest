import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficePageComponent } from './back-office-page.component';
import { UtilModule } from '../util/util.module';
import { RouterModule } from '@angular/router';
import { CartsOverviewComponent } from './carts/carts-overview/carts-overview.component';
import { ProjectsOverviewComponent } from './projects/projects-overview/projects-overview.component';
import { UserOverviewComponent } from './user/user-overview/user-overview.component';
import { CartFilterComponent } from './carts/cart-filter/cart-filter.component';
import { CartGridComponent } from './carts/cart-grid/cart-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    BackOfficePageComponent,
    CartsOverviewComponent,
    ProjectsOverviewComponent,
    UserOverviewComponent,
    CartFilterComponent,
    CartGridComponent,
  ],
  imports: [
    CommonModule,
    UtilModule,
    RouterModule,
    AgGridModule.forRoot()
  ],
})
export class BackofficePageModule {}
