import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { downloadReceiptPdf } from '../../../../store/carts.store';
import { AppState } from '../../../../store/app.state';
import { ProfileReceipt } from '../../../../store/profile.store';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-profile-receipts',
    templateUrl: './profile-receipts.component.html',
    styleUrls: ['./profile-receipts.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatIcon,
        MatTooltip,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
        DatePipe,
        TranslateModule,
    ],
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
