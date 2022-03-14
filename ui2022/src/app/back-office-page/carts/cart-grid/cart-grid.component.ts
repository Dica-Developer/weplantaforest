import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectCarts, updateAddress } from '../../../store/carts.store';
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
      field: 'firstName',
      headerName: 'Vorname',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
    
    },
    {
      field: 'lastName',
      headerName: 'Nachname',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
    },
    {
      field: 'company',
      headerName: 'Unternehmen',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
    },
    {
      field: 'street',
      headerName: 'Straße',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
    },
    {
      field: 'city',
      headerName: 'Ort',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
    },
    {
      field: 'postalcode',
      headerName: 'PLZ',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: params => {
        this.store.dispatch(updateAddress({cartId: params.data.id, field: params.colDef.field, value: params.newValue}))
        return true;
      }
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

  onCellValueChanged(event: CellValueChangedEvent) {
  }
}
