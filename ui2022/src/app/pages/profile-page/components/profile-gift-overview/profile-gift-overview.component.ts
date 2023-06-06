import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { openGiftPdf, ProfileGift } from '../../../../store/profile.store';

@Component({
  selector: 'app-profile-gift-overview',
  templateUrl: './profile-gift-overview.component.html',
  styleUrls: ['./profile-gift-overview.component.scss'],
})
export class ProfileGiftOverviewComponent implements OnInit {
  @Input()
  recipientGifts: ProfileGift[];

  @Input()
  consignorGifts: ProfileGift[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  openGiftPdf(id: number) {
    this.store.dispatch(openGiftPdf({ id }));
  }
}
