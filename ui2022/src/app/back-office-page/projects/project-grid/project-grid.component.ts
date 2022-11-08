import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CellClickedEvent,
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { AppState } from 'src/app/store/app.state';
import { GridHelper } from '../../../util/grid.helper';
import { Store } from '@ngrx/store';
import {
  selectProjects,
  selectProjectsLoading,
} from '../../../store/project.store';
import { Observable, Subscription } from 'rxjs';
import { loadProjects, loadProjectDetails } from '../../../store/project.store';
import { GridProjectActionsComponent } from '../../../util/grid-components/grid-project-actions/grid-project-actions.component';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
})
export class ProjectGridComponent implements OnInit, OnDestroy {
  gridApi: GridApi;
  selectedRowIndex: number;

  colDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'id',
      headerName: 'Löschen',
      cellRendererSelector: (params) => {
        return {
          component: 'projectActionRenderer',
          value: params.data.id,
        };
      },
    },
  ];

  rowData = [];

  projectsLoading$: Observable<boolean>;

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      projectActionRenderer: GridProjectActionsComponent,
    },
    onCellClicked: (event: CellClickedEvent) => {
      if (event.column.getColId() === 'name') {
        this.store.dispatch(loadProjectDetails({ id: event.data.id }));
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

  selectProjectsSub: Subscription;

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    this.selectProjectsSub = store
      .select(selectProjects)
      .subscribe((projects) => {
        this.rowData = projects;
      });
    this.store.dispatch(loadProjects());
    this.projectsLoading$ = this.store.select(selectProjectsLoading);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectProjectsSub.unsubscribe();
  }

  onCellValueChanged(event: CellValueChangedEvent) {}

  rowStyleFn(params) {
    if (params.node.rowIndex === this.selectedRowIndex) {
      return { background: 'red' };
    }
  }

  resetSelectedRowIndex() {
    this.selectedRowIndex = null;
    this.gridApi.redrawRows();
  }
}
