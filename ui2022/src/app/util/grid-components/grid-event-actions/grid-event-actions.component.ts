import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-grid-event-actions',
    templateUrl: './grid-event-actions.component.html',
    styleUrls: ['./grid-event-actions.component.scss'],
    standalone: true
})
export class GridEventActionsComponent implements ICellEditorAngularComp {

  eventId: number;

  constructor() { }


  agInit(params: any): void {
    this.eventId = params.value;
  }

  getValue() {
    return this.eventId;
  }
}
