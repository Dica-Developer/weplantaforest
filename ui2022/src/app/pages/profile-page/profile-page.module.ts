import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileTreesComponent } from './components/profile-trees/profile-trees.component';
import { ProfileGiftOverviewComponent } from './components/profile-gift-overview/profile-gift-overview.component';
import { ProfileRedeemGiftComponent } from './components/profile-redeem-gift/profile-redeem-gift.component';
import { ProfileReceiptsComponent } from './components/profile-receipts/profile-receipts.component';

@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, EditProfilePageComponent, ProfileTreesComponent, ProfileGiftOverviewComponent, ProfileRedeemGiftComponent, ProfileReceiptsComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProfilePageComponent, EditProfilePageComponent],
})
export class ProfilePageModule {}
