import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-select',
  templateUrl: './grid-select.component.html',
  styleUrls: ['./grid-select.component.scss'],
})
export class GridSelectComponent implements ICellEditorAngularComp {
  value: string;
  valueList: any[];
  valueChange: any;

  cartId: number;

  constructor() {}

  agInit(params: any): void {
    this.value = params.value;
    this.valueList = params.valueList;
    this.valueChange = params.valueChange;
    this.cartId = params.data.id;
  }

  getValue() {
    return this.value;
  }

  valueChanged(event: any) {
    this.valueChange(this.cartId, event.value);
  }
}
