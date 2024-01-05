import { Component, OnInit, OnDestroy } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { selectCarts, updateAddress, updateReceiptableFlag } from '../../../../store/carts.store';
import { GridHelper } from '../../../../util/grid.helper';
import { GridCheckboxComponent } from '../../../../util/grid-components/grid-checkbox/grid-checkbox.component';
import { GridSelectComponent } from '../../../../util/grid-components/grid-select/grid-select.component';
import { updateStatus, CartDetails, selectCartDetails } from '../../../../store/carts.store';
import { GridCartActionsComponent } from '../../../../util/grid-components/grid-cart-actions/grid-cart-actions.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-grid',
  templateUrl: './cart-grid.component.html',
  styleUrls: ['./cart-grid.component.scss'],
})
export class CartGridComponent implements OnInit, OnDestroy {
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
      field: 'paymentType',
      headerName: 'Zahlungsart',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
    },
    {
      field: 'receiptable',
      headerName: 'SQ',
      width: 60,
      suppressSizeToFit: true,
      cellRendererSelector: (params) => {
        return {
          component: 'checkboxRenderer',
          params: {
            value: params.data.receiptable,
            disabled: params.data.receiptId !== null && params.data.receiptId !== undefined,
            id: params.data.id,
            valueChange: (cartId, value) =>
              this.store.dispatch(
                updateReceiptableFlag({
                  cartId,
                  value,
                }),
              ),
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
      cellRenderer: 'selectRenderer',
      cellRendererParams: {
        valueList: this.gridHelper.getCartStates(),
        valueChange: (cartId, value) => {
          if (value === 'DISCARDED') {
            const dialogRef = this.dialog.open(DiscardCartConfirmationDialog);
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                this.store.dispatch(
                  updateStatus({
                    cartId,
                    value,
                  }),
                );
              }
            });
          } else {
            this.store.dispatch(
              updateStatus({
                cartId,
                value,
              }),
            );
          }
        },
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
      width: 180,
    },
  ];

  allColumns: ColDef[] = [
    ...this.subsetOfColumns,
    {
      field: 'receiptSentOn',
      headerName: 'SQ gesendet am',
      valueFormatter: this.gridHelper.dateFormatter,
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
      field: 'country',
      headerName: 'Land',
      filter: 'agTextColumnFilter',
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => this.updateAddress(params),
    },
  ];

  colDefs: ColDef[] = this.subsetOfColumns;

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      checkboxRenderer: GridCheckboxComponent,
      selectRenderer: GridSelectComponent,
      cartActionRenderer: GridCartActionsComponent,
    },
  };

  rowData = [];

  cartDetails: CartDetails;

  selectCartsSub = this.store.select(selectCarts).subscribe((carts) => {
    this.rowData = carts;
  });

  selectCartDetailsSub = this.store.select(selectCartDetails).subscribe((details) => {
    this.cartDetails = details;
  });

  gridApi: GridApi;
  columnApi: ColumnApi;

  constructor(
    private store: Store<AppState>,
    private gridHelper: GridHelper,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectCartsSub.unsubscribe();
    this.selectCartDetailsSub.unsubscribe();
  }

  onCellValueChanged(event: CellValueChangedEvent) {}

  updateAddress(params) {
    this.store.dispatch(
      updateAddress({
        cartId: params.data.id,
        field: params.colDef.field,
        value: params.newValue,
      }),
    );
    return true;
  }

  filterColumns() {
    this.colDefs = this.subsetOfColumns;
    // this.columnApi.autoSizeAllColumns();
  }

  resetColumns() {
    this.colDefs = this.allColumns;
    // this.columnApi.autoSizeAllColumns();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.columnApi.autoSizeAllColumns();
    this.columnApi.sizeColumnsToFit(1800);
  }
}

@Component({
  selector: 'discard-cart-confirmation-dialog',
  templateUrl: 'discard-cart-confirmation-dialog.html',
})
export class DiscardCartConfirmationDialog {}
