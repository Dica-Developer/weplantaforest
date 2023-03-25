import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent, EditProfilePageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProfilePageComponent, EditProfilePageComponent],
})
export class ProfilePageModule {}
