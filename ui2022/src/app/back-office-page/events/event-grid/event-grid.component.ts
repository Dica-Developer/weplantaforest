import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  GridApi,
  ColDef,
  GridOptions,
  CellClickedEvent,
} from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GridHelper } from '../../../util/grid.helper';
import { Observable, Subscription } from 'rxjs';
import {
  selectEvents,
  selectEventsLoading,
  loadEventDetails,
} from '../../../store/events.store';
import { CellValueChangedEvent } from 'ag-grid-community';
import { GridEventActionsComponent } from 'src/app/util/grid-components/grid-event-actions/grid-event-actions.component';

@Component({
  selector: 'app-event-grid',
  templateUrl: './event-grid.component.html',
  styleUrls: ['./event-grid.component.scss'],
})
export class EventGridComponent implements OnInit, OnDestroy {
  gridApi: GridApi;
  selectedRowIndex: number;

  rowData = [];

  eventsLoading$: Observable<boolean>;

  colDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'id',
      headerName: 'Actions',
      cellRendererSelector: (params) => {
        return {
          component: 'gridActionRenderer',
          value: params.data.id,
        };
      },
    },
  ];

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      gridActionRenderer: GridEventActionsComponent,
    },
    onCellClicked: (event: CellClickedEvent) => {
      if (event.column.getColId() === 'name') {
        this.store.dispatch(loadEventDetails({ id: event.data.id }));
        this.selectedRowIndex = event.rowIndex;
        this.gridApi.redrawRows();
      }
    },
    getRowStyle: (params) => {
      if (params.node.rowIndex === this.selectedRowIndex) {
        return { background: '#82ab1f', color: '#fff' };
      }
    },
    onGridReady: (params) => {
      this.gridApi = params.api;
      // this.gridColumnApi = params.columnApi;
    },
  };

  selectEventsSub: Subscription;

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    this.selectEventsSub = this.store
      .select(selectEvents)
      .subscribe((events) => {
        this.rowData = events;
      });
    this.eventsLoading$ = this.store.select(selectEventsLoading);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectEventsSub.unsubscribe();
  }

  onCellValueChanged(event: CellValueChangedEvent) {}
}
