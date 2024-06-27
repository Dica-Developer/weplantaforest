import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CircleIconComponent } from '../icons/circle-icon/circle-icon.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-offer-area',
    templateUrl: './offer-area.component.html',
    styleUrls: ['./offer-area.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        CircleIconComponent,
        TranslateModule,
    ],
})
export class OfferAreaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
