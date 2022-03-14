import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectCarts } from '../../../store/carts.store';
import { GridHelper } from '../../../util/grid.helper';

@Component({
  selector: 'app-cart-grid',
  templateUrl: './cart-grid.component.html',
  styleUrls: ['./cart-grid.component.scss'],
})
export class CartGridComponent implements OnInit {
  colDefs: ColDef[] = [
    {
      field: 'username',
      headerName: 'User',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'price',
      headerName: 'Preis (€)',
      valueFormatter: this.gridHelper.priceFormatter,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Erstellt am',
      valueFormatter: this.gridHelper.dateFormatter,
      sortable: true,
    },
    {
      field: 'givenName',
      headerName: 'Vorname',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'name',
      headerName: 'Nachname',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'company',
      headerName: 'Unternehmen',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'street',
      headerName: 'Straße',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'city',
      headerName: 'Ort',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'zip',
      headerName: 'PLZ',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'paymentType',
      headerName: 'Zahlungsart',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
  ];

  rowData = [];

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    store.select(selectCarts).subscribe((carts) => {
      this.rowData = carts;
    });
  }

  ngOnInit(): void {}
}
