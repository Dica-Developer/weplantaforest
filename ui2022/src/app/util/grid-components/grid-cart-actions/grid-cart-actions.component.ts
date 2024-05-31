import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  sendReceipt,
  downloadReceiptPdf,
  loadCartDetails,
  createReceipt,
} from 'src/app/store/carts.store';
import { MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton, MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-grid-cart-actions',
    templateUrl: './grid-cart-actions.component.html',
    styleUrls: ['./grid-cart-actions.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatIconButton,
        MatTooltip,
        MatIcon,
    ],
})
export class GridCartActionsComponent implements ICellEditorAngularComp {
  cartId: number;
  receiptId: number;
  userId: number;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  agInit(params: any): void {
    this.cartId = params.value;
    this.receiptId = params.data.receiptId;
    this.userId = params.data.userId;
  }

  getValue() {
    return this.cartId;
  }

  sendReceipt() {
    this.dialog
      .open(SendReceiptConfirmationDialog, {
        width: '400px',
      })
      .afterClosed()
      .pipe(first())
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(sendReceipt({ receiptId: this.receiptId, userId: this.userId }));
        }
      });
  }

  createReceipt() {
    this.store.dispatch(createReceipt({ cartId: this.cartId, userId: this.userId }));
  }

  downloadReceipt() {
    this.store.dispatch(downloadReceiptPdf({ receiptId: this.receiptId }));
  }

  loadCartDetails() {
    this.store.dispatch(loadCartDetails({ cartId: this.cartId }));
  }
}

@Component({
    selector: 'send-receipt-confirmation-dialog',
    templateUrl: 'send-receipt-confirmation-dialog.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class SendReceiptConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<SendReceiptConfirmationDialog>) {}
}
