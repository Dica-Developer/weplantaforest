import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { downloadReceiptPdf } from '../../../../store/carts.store';
import { AppState } from '../../../../store/app.state';
import { ProfileReceipt } from '../../../../store/profile.store';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-receipts',
  templateUrl: './profile-receipts.component.html',
  styleUrls: ['./profile-receipts.component.scss'],
})
export class ProfileReceiptsComponent implements OnInit {
  displayedColumns: string[] = ['createdOn', 'invoiceNumber', 'PDF'];
  dataSource;

  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 0;

  receiptPages: Map<number, ProfileReceipt[]> = new Map<number, ProfileReceipt[]>();
  receiptArray: ProfileReceipt[] = [];
  @Input()
  set receipts(receipts: ProfileReceipt[]) {
    this.receiptArray = receipts;
    this.totalPosts = receipts.length;
    this.createReceiptPages(this.postsPerPage, receipts);
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.postsPerPage = pageData.pageSize;
    this.createReceiptPages(this.postsPerPage, this.receiptArray);
  }

  downloadReceipt(receiptId: number) {
    this.store.dispatch(downloadReceiptPdf({ receiptId }));
  }

  createReceiptPages(pageSize: number, receipts: ProfileReceipt[]) {
    this.receiptPages = new Map<number, ProfileReceipt[]>();
    let pageCnt = 0;
    if (receipts && receipts.length > 0) {
      for (let i = 0; i < receipts.length; i += pageSize) {
        const chunk = receipts.slice(i, i + pageSize);
        this.receiptPages.set(pageCnt, chunk);
        pageCnt++;
      }
    }
  }
}
