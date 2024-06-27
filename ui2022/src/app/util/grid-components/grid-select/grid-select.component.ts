import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatOption } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'app-grid-select',
    templateUrl: './grid-select.component.html',
    styleUrls: ['./grid-select.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatSelect,
        NgFor,
        MatOption,
    ],
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
