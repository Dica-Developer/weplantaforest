import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { downloadReceiptPdf } from '../../../../store/carts.store';
import { AppState } from '../../../../store/app.state';
import { ProfileDetails, ProfileReceipt } from '../../../../store/profile.store';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-receipts',
  templateUrl: './profile-receipts.component.html',
  styleUrls: ['./profile-receipts.component.scss'],
})
export class ProfileReceiptsComponent implements OnInit {
  displayedColumns: string[] = ['createdOn', 'invoiceNumber', 'PDF'];
  dataSource;
  @Input() receipts: ProfileReceipt[];

  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 100];
  currentPage = 1;

  // receiptPages: Map<number, ProfileReceipt[]> = new Map<number, ProfileReceipt[]>();
  // activePage: number = 0;
  // @Input()
  // set receipts(receipts: ProfileReceipt[]) {
  //   this.receiptPages = new Map<number, ProfileReceipt[]>();
  //   let pageCnt = 0;
  //   if (receipts && receipts.length > 0) {
  //     for (let i = 0; i < receipts.length; i += 5) {
  //       const chunk = receipts.slice(i, i + 5);
  //       this.receiptPages.set(pageCnt, chunk);
  //       pageCnt++;
  //     }
  //   }
  // }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.totalPosts = this.receipts.length;
  }

  downloadReceipt(receiptId: number) {
    this.store.dispatch(downloadReceiptPdf({ receiptId }));
  }

  // setActivePage(page: number) {
  //   this.activePage = page;
  // }

  // incrementActivePage() {
  //   this.activePage++;
  // }

  // decrementActivePage() {
  //   this.activePage--;
  // }
}
