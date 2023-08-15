import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { EditProfilePageComponent } from '../edit-profile-page/edit-profile-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileTreesComponent } from './components/profile-trees/profile-trees.component';
import { ProfileGiftOverviewComponent } from './components/profile-gift-overview/profile-gift-overview.component';
import { ProfileReceiptsComponent } from './components/profile-receipts/profile-receipts.component';
import { ProfileCertificatesComponent } from './components/profile-certificates/profile-certificates.component';
import { ProfileWidgetsComponent } from './components/profile-widgets/profile-widgets.component';
import { TeamEditComponent } from './components/team-edit/team-edit.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    EditProfilePageComponent,
    ProfileTreesComponent,
    ProfileGiftOverviewComponent,
    ProfileReceiptsComponent,
    ProfileCertificatesComponent,
    ProfileWidgetsComponent,
    EditProfilePageComponent,
    ProfileTreesComponent,
    ProfileGiftOverviewComponent,
    ProfileReceiptsComponent,
    TeamEditComponent,
    ProfileDetailsComponent,
    ProfileHeaderComponent,
  ],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProfilePageComponent, EditProfilePageComponent],
})
export class ProfilePageModule {}
