import { Component, OnInit } from '@angular/core';
import { GridApi, ColDef, GridOptions } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { GridHelper } from '../../../util/grid.helper';
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
      width: 400
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

    // {
    //   field: 'id',
    //   headerName: 'Actions',
    //   cellRendererSelector: (params) => {
    //     return {
    //       component: 'projectActionRenderer',
    //       value: params.data.id,
    //     };
    //   },
    // },
  ];

  rowData = [];
  articlesLoading$;

  gridOptions: GridOptions = {
    rowData: [],
    onGridReady: (params) => {
      this.gridApi = params.api;
      // this.gridColumnApi = params.columnApi;
    },
  };

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    store.select(selectContentArticles).subscribe((articles) => {
      this.rowData = articles;
    });
    this.store.dispatch(loadContentArticles());
    this.articlesLoading$ = this.store.select(selectContentArticlesLoading);
  }

  ngOnInit(): void {}
}
