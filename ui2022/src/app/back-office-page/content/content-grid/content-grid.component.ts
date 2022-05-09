import { Component, OnInit } from '@angular/core';
import {
  GridApi,
  ColDef,
  GridOptions,
  CellClickedEvent,
} from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GridHelper } from '../../../util/grid.helper';
import { GridContentActionsComponent } from '../../../util/grid-components/grid-content-actions/grid-content-actions.component';
import {
  loadArticleTypes,
  loadArticleDetails,
} from '../../../store/content.store';
import {
  selectContentArticles,
  loadContentArticles,
  selectContentArticlesLoading,
} from '../../../store/content.store';

@Component({
  selector: 'app-content-grid',
  templateUrl: './content-grid.component.html',
  styleUrls: ['./content-grid.component.scss'],
})
export class ContentGridComponent implements OnInit {
  gridApi: GridApi;
  selectedRowIndex: number;

  colDefs: ColDef[] = [
    {
      field: 'title',
      headerName: 'Titel',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      width: 400,
    },
    {
      field: 'articleType',
      headerName: 'Typ',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'lang',
      headerName: 'Sprache',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'createdOn',
      headerName: 'Erstellt am',
      valueFormatter: this.gridHelper.dateFormatter,
      sortable: true,
    },

    {
      field: 'id',
      headerName: 'Actions',
      cellRendererSelector: (params) => {
        return {
          component: 'contentActionRenderer',
          value: params.data.id,
        };
      },
    },
  ];

  rowData = [];
  articlesLoading$;

  gridOptions: GridOptions = {
    rowData: [],
    onGridReady: (params) => {
      this.gridApi = params.api;
      // this.gridColumnApi = params.columnApi;
    },
    components: {
      contentActionRenderer: GridContentActionsComponent,
    },
    onCellClicked: (event: CellClickedEvent) => {
      if (event.column.getColId() != 'id') {
        this.store.dispatch(loadArticleDetails({ id: event.data.id }));
        this.selectedRowIndex = event.rowIndex;
        this.gridApi.redrawRows();
      }
    },
    getRowStyle: (params) => {
      if (params.node.rowIndex === this.selectedRowIndex) {
        return { background: '#82ab1f', color: '#fff' };
      }
    },
  };

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    store.select(selectContentArticles).subscribe((articles) => {
      this.rowData = articles;
    });
    this.store.dispatch(loadContentArticles());
    this.articlesLoading$ = this.store.select(selectContentArticlesLoading);
    this.store.dispatch(loadArticleTypes());
  }

  ngOnInit(): void {}
}
