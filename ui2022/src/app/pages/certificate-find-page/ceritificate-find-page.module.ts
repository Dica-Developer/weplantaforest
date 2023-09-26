import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilModule } from '../../util/util.module';
import { RouterModule } from '@angular/router';
import { CertificateFindPageComponent } from './certificate-find-page.component';
import { CertificateCarouselItemComponent } from './components/certificate-carousel-item/certificate-carousel-item.component';

@NgModule({
  declarations: [CertificateFindPageComponent, CertificateCarouselItemComponent],
  imports: [CommonModule, UtilModule, RouterModule],
})
export class CertificateFindPageModule {}
