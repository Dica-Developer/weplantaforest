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
  receiptPages: Map<number, ProfileReceipt[]> = new Map<number, ProfileReceipt[]>();

  activePage: number = 0;

  @Input()
  set receipts(receipts: ProfileReceipt[]) {
    this.receiptPages = new Map<number, ProfileReceipt[]>();
    let pageCnt = 0;
    if (receipts && receipts.length > 0) {
      for (let i = 0; i < receipts.length; i += 5) {
        const chunk = receipts.slice(i, i + 5);
        this.receiptPages.set(pageCnt, chunk);
        pageCnt++;
      }
    }
    console.log(this.receiptPages);
    

  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  downloadReceipt(receiptId: number) {
    this.store.dispatch(downloadReceiptPdf({ receiptId }));
  }

  setActivePage(page: number) {
    this.activePage = page;
  }

  incrementActivePage() {
    this.activePage++;
  }

  decrementActivePage() {
    this.activePage--;
  }
}
