import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { createAndSendReceipt } from 'src/app/store/carts.store';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-grid-cart-actions',
  templateUrl: './grid-cart-actions.component.html',
  styleUrls: ['./grid-cart-actions.component.scss'],
})
export class GridCartActionsComponent implements ICellEditorAngularComp {
  cartId: number;
  receiptId: number;
  userId: number;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService
  ) {}

  agInit(params: any): void {
    console.log(params);
    this.cartId = params.value;
    this.receiptId = params.data.receiptId;
    this.userId = params.data.userId;
  }

  getValue() {
    return this.cartId;
  }

  createAndSendReceipt() {
    this.store.dispatch(
      createAndSendReceipt({ cartId: this.cartId, userId: this.userId })
    );
  }

  downloadReceipt() {
    this.cartService.generateReceiptPdf(this.receiptId);
  }
}
