import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficePageComponent } from './back-office-page.component';
import { UtilModule } from '../util/util.module';
import { RouterModule } from '@angular/router';
import { CartsOverviewComponent } from './carts/carts-overview/carts-overview.component';
import { ProjectsOverviewComponent } from './projects/projects-overview/projects-overview.component';
import { UserOverviewComponent } from './user/user-overview/user-overview.component';
import { CartFilterComponent } from './carts/cart-filter/cart-filter.component';
import { CartGridComponent, DiscardCartConfirmationDialog } from './carts/cart-grid/cart-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { CartDetailsComponent } from './carts/cart-details/cart-details.component';
import { UserGridComponent } from './user/user-grid/user-grid.component';
import { ProjectGridComponent } from './projects/project-grid/project-grid.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectEditDataComponent } from './projects/project-edit/project-edit-data/project-edit-data.component';
import { ProjectEditLocationComponent } from './projects/project-edit/project-edit-location/project-edit-location.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { ProjectEditTreeComponent, DeleteArticleConfirmationDialog } from './projects/project-edit/project-edit-tree/project-edit-tree.component';
import { ProjectEditImageComponent, DeleteProjectImageConfirmationDialog } from './projects/project-edit/project-edit-image/project-edit-image.component';
import { DeleteProjectConfirmationDialog } from '../util/grid-components/grid-project-actions/grid-project-actions.component';
import { ContentOverviewComponent } from './content/content-overview/content-overview.component';
import { ContentGridComponent } from './content/content-grid/content-grid.component';
import { ContentDetailsComponent } from './content/content-details/content-details.component';
import { ContentEditComponent } from './content/content-edit/content-edit.component';
import { ContentPreviewComponent } from './content/content-preview/content-preview.component';
import { ContentParagraphComponent } from './content/content-paragraph/content-paragraph.component';

@NgModule({
  declarations: [
    BackOfficePageComponent,
    CartsOverviewComponent,
    ProjectsOverviewComponent,
    UserOverviewComponent,
    CartFilterComponent,
    CartGridComponent,
    CartDetailsComponent,
    UserGridComponent,
    ProjectGridComponent,
    ProjectEditComponent,
    ProjectEditDataComponent,
    ProjectEditLocationComponent,
    ProjectEditTreeComponent,
    DeleteArticleConfirmationDialog,
    ProjectEditImageComponent,
    DeleteProjectImageConfirmationDialog,
    DiscardCartConfirmationDialog,
    ContentOverviewComponent,
    ContentGridComponent,
    ContentDetailsComponent,
    ContentEditComponent,
    ContentPreviewComponent,
    ContentParagraphComponent,
    // DeleteProjectConfirmationDialog
  ],
  imports: [
    CommonModule,
    UtilModule,
    RouterModule,
    AgGridModule.forRoot(),
    LeafletModule,
    LeafletDrawModule
  ],
})
export class BackofficePageModule {}
