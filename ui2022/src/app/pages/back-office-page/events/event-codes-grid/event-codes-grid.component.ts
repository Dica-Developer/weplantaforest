import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridApi, ColDef, GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { GridHelper } from '../../../../util/grid.helper';
import { AppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectEventCodes, selectEventDetails } from '../../../../store/events.store';

@Component({
  selector: 'app-event-codes-grid',
  templateUrl: './event-codes-grid.component.html',
  styleUrls: ['./event-codes-grid.component.scss'],
})
export class EventCodesGridComponent implements OnInit, OnDestroy {
  gridApi: GridApi;

  colDefs: ColDef[] = [
    {
      field: 'code',
      headerName: 'Code',
    },
    {
      headerName: 'Cart-Status',
      sortable: true,
      valueGetter: (params) => {
        if (params.data.cart) {
          return params.data.cart.cartState;
        } else {
          return 'No Cart generated';
        }
      },
    },
  ];

  rowData = [];

  gridOptions: GridOptions = {
    rowData: [],
    onGridReady: (params) => {
      this.gridApi = params.api;
    },
  };

  eventDetailsSub: Subscription;
  eventName: string = '';

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    this.eventDetailsSub = this.store.select(selectEventDetails).subscribe((details) => {
      this.eventName = details.name;
      if (details.codes) {
        this.rowData = details.codes;
      }
    });
  }

  ngOnInit(): void {}

  exportAsCsv() {
    const exportParams = {
      fileName: this.eventName.replace(' ', '_'),
    };
    this.gridApi.exportDataAsCsv(exportParams);
  }

  ngOnDestroy(): void {
    this.eventDetailsSub.unsubscribe();
  }
}
