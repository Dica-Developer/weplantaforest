import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { downloadReceiptPdf } from '../../../../store/carts.store';
import { AppState } from '../../../../store/app.state';
import { ProfileReceipt } from '../../../../store/profile.store';

@Component({
  selector: 'app-profile-receipts',
  templateUrl: './profile-receipts.component.html',
  styleUrls: ['./profile-receipts.component.scss'],
})
export class ProfileReceiptsComponent implements OnInit {
  @Input()
  receipts: ProfileReceipt[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  downloadReceipt(receiptId: number) {
    this.store.dispatch(downloadReceiptPdf({ receiptId }));
  }
}
