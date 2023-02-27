import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from 'src/app/util/util.module';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page.component';

@NgModule({
  declarations: [ContactPageComponent],
  imports: [CommonModule, UtilModule, RouterModule],
  exports: [ContactPageComponent],
})
export class ContactModule {}
