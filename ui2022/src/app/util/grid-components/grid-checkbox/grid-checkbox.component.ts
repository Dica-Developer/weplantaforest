import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-grid-checkbox',
  templateUrl: './grid-checkbox.component.html',
  styleUrls: ['./grid-checkbox.component.scss']
})
export class GridCheckboxComponent implements ICellEditorAngularComp{

  value: boolean = true;
  disabled: boolean = false;

  constructor() { }

  agInit(params: any): void {    
    this.value = params.value;
    this.disabled = params.disabled;
  }

  getValue() {
    return this.value;
  }
}
