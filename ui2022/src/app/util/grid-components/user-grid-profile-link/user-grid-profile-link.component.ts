import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-user-grid-profile-link',
    templateUrl: './user-grid-profile-link.component.html',
    styleUrls: ['./user-grid-profile-link.component.scss'],
    standalone: true,
    imports: [MatIcon]
})
export class UserGridProfileLinkComponent implements ICellEditorAngularComp {
  value: string;

  constructor() {}

  agInit(params: any): void {
    this.value = params.value;
  }

  getValue() {
    return this.value;
  }


}
