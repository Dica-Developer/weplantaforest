import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridOptions } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  selectCarts,
  updateAddress,
  updateReceiptableFlag,
} from '../../../store/carts.store';
import { GridHelper } from '../../../util/grid.helper';
import { GridCheckboxComponent } from '../../../util/grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from '../../../util/grid-components/grid-select/grid-select.component';
import { updateStatus, CartDetails, selectCartDetails } from '../../../store/carts.store';
import { GridCartActionsComponent } from '../../../util/grid-components/grid-cart-actions/grid-cart-actions.component';

@Component({
  selector: 'app-cart-grid',
  templateUrl: './cart-grid.component.html',
  styleUrls: ['./cart-grid.component.scss'],
})
export class CartGridComponent implements OnInit {

  allColumns: ColDef[] = [
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
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'lastName',
      headerName: 'Nachname',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'company',
      headerName: 'Unternehmen',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'street',
      headerName: 'Straße',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'city',
      headerName: 'Ort',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'postalcode',
      headerName: 'PLZ',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
    {
      field: 'paymentType',
      headerName: 'Zahlungsart',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'receiptable',
      headerName: 'SQ',
      cellRendererSelector: (params) => {
        return {
          component: 'checkboxRenderer',
          params: {
            value: params.data.receiptable,
            disabled:
              params.data.receiptId !== null &&
              params.data.receiptId !== undefined,
            cartId: params.data.id,
            valueChange: (cartId, value) =>
              this.store.dispatch(updateReceiptableFlag({ cartId, value })),
          },
        };
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      sortable: true,
      editable: (params) => {
        if (params.data.status === 'DISCARDED') {
          return false;
        } else {
          return true;
        }
      },
      cellEditor: 'selectRenderer',
      cellEditorParams: {
        valueList: this.gridHelper.getCartStates(),
        valueChange: (cartId, value) =>
          this.store.dispatch(updateStatus({ cartId, value })),
      },
    },
    {
      field: 'id',
      headerName: 'Actions',
      cellRendererSelector: (params) => {
        return {
          component: 'cartActionRenderer',
          params: {
            value: params.data.id,
          },
        };
      },
    }
  ];

  subsetOfColumns: ColDef[] = [
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
  ];

  colDefs: ColDef[] = this.allColumns;

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      checkboxRenderer: GridCheckboxComponent,
      selectRenderer: GridSelectComponent,
      cartActionRenderer: GridCartActionsComponent
    },
  };

  rowData = [];

  cartDetails: CartDetails;

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    store.select(selectCarts).subscribe((carts) => {
      this.rowData = carts;
    });
    store.select(selectCartDetails).subscribe((details) => {
      this.cartDetails = details;
    });
  }

  ngOnInit(): void {}

  onCellValueChanged(event: CellValueChangedEvent) {}

  updateAddress(params) {
    this.store.dispatch(
      updateAddress({
        cartId: params.data.id,
        field: params.colDef.field,
        value: params.newValue,
      })
    );
    return true;
  }

  filterColumns() {
    this.colDefs = this.subsetOfColumns;
  }

  resetColumns() {
    this.colDefs = this.allColumns;
  }
}
