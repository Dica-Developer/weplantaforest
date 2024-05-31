import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TextHelper } from '../../util/text.helper';
import {
  findCertificatePlantings,
  findCertificateSummary,
  selectCertificate,
} from '../../store/profile.store';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { CertificateCarouselItemComponent } from './components/certificate-carousel-item/certificate-carousel-item.component';
import { NgIf, NgFor, AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-certificate-find-page',
    templateUrl: './certificate-find-page.component.html',
    styleUrls: ['./certificate-find-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        CertificateCarouselItemComponent,
        AsyncPipe,
        TitleCasePipe,
        TranslateModule,
    ],
})
export class CertificateFindPageComponent implements OnInit, OnDestroy {
  routeSub: Subscription;

  certificateId: string;

  certificate$ = this.store.select(selectCertificate);

  certificatePlantingSub: Subscription;
  amountOfTrees: number = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private textHelper: TextHelper,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((paramMap) => {
      this.certificateId = paramMap.get('id');
      this.store.dispatch(findCertificatePlantings({ id: this.certificateId }));
      this.store.dispatch(findCertificateSummary({ id: this.certificateId }));
    });
    this.certificatePlantingSub = this.certificate$.subscribe((certificate) => {
      this.amountOfTrees = 0;
      certificate.plantings.forEach((planting) => {
        this.amountOfTrees += planting.amount;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.certificatePlantingSub?.unsubscribe();
  }

  getTreeTypeName(name: string) {
    return this.textHelper.getTextForLanguage(name, this.translateService.currentLang);
  }

  createTreeTypeImageUrl(imageFileName: string) {
    return environment.backendUrl + '/treeType/image/' + imageFileName + '/100/100';
  }
}
