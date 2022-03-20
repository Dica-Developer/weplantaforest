import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-checkbox',
  templateUrl: './grid-checkbox.component.html',
  styleUrls: ['./grid-checkbox.component.scss'],
})
export class GridCheckboxComponent implements ICellEditorAngularComp {
  value: boolean;
  disabled: boolean;
  id: number;
  valueChange: any;

  constructor() {}

  agInit(params: any): void {
    this.value = params.value;
    this.disabled = params.disabled;
    this.id = params.id;
    this.valueChange = params.valueChange;
  }

  getValue() {
    return this.value;
  }

  valueChanged(event: any) {
    this.valueChange(this.id, event.checked);
  }
}
