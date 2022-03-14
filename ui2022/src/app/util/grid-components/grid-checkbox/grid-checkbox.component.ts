import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { updateReceiptableFlag } from '../../../store/carts.store';

@Component({
  selector: 'app-grid-checkbox',
  templateUrl: './grid-checkbox.component.html',
  styleUrls: ['./grid-checkbox.component.scss'],
})
export class GridCheckboxComponent implements ICellEditorAngularComp {
  value: boolean;
  disabled: boolean;
  cartId: number;
  valueChange: any;

  constructor(private store: Store<AppState>) {}

  agInit(params: any): void {
    console.log('init');
    
    this.value = params.value;
    this.disabled = params.disabled;
    this.cartId = params.cartId;
    this.valueChange = params.valueChange;
  }

  getValue() {
    return this.value;
  }

  valueChanged(event: any) {
    this.valueChange(this.cartId, event.checked);
  }
}
