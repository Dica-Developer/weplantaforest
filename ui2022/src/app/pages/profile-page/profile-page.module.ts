import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

@NgModule({
  declarations: [ProfilePageComponent, ProfileInfoComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ProfilePageComponent],
})
export class ProfilePageModule {}
