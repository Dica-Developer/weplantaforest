import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { GridHelper } from 'src/app/util/helper/grid.helper';
import { Observable, Subscription } from 'rxjs';
import { selectUsersLoadingProgress, loadUsers, selectUsers } from '../../../../store/user.store';
import { CellClickedEvent, CellValueChangedEvent, ColDef, GridOptions } from 'ag-grid-community';
import { GridCheckboxComponent } from '../../../../util/grid-components/grid-checkbox/grid-checkbox.component';
import { UserGridProfileLinkComponent } from '../../../../util/grid-components/user-grid-profile-link/user-grid-profile-link.component';
import {
  updateUserBannedFlag,
  updateUserAdminRole,
} from '../../../../store/user.store';
import {
  updateUserName,
  updateUserEmail,
  updateUserActiveFlag,
} from '../../../../store/user.store';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user-grid',
    templateUrl: './user-grid.component.html',
    styleUrls: ['./user-grid.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatProgressBar,
        AgGridAngular,
        AsyncPipe,
    ],
})
export class UserGridComponent implements OnInit, OnDestroy {
  usersLoading$: Observable<boolean>;

  rowData = [];

  colDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'User Name',
      filter: 'agTextColumnFilter',
      width: 350,
      sortable: true,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => {
        this.store.dispatch(updateUserName({ userId: params.data.id, userName: params.newValue }));
        return true;
      },
    },
    {
      field: 'name',
      headerName: 'Profil',
      sortable: false,
      width: 80,
      cellRenderer: 'profileRenderer',
      onCellClicked: (event: CellClickedEvent) => {
        this.router.navigate(['/user', event.value.trim()]);
      },
    },
    {
      field: 'regDate',
      headerName: 'Registrierdatum',
      sortable: true,
      valueFormatter: this.gridHelper.dateFormatter,
      width: 150,
    },
    {
      field: 'mail',
      headerName: 'E-Mail',
      filter: 'agTextColumnFilter',
      sortable: true,
      width: 350,
      comparator: this.gridHelper.caseInsensitiveComparator,
      editable: true,
      valueSetter: (params) => {
        this.store.dispatch(updateUserEmail({ userId: params.data.id, mail: params.newValue }));
        return true;
      },
    },
    {
      field: 'enabled',
      headerName: 'aktiv',
      cellRendererSelector: (params) => {
        return {
          component: 'checkboxRenderer',
          params: {
            value: params.data.enabled,
            disabled: false,
            id: params.data.id,
            valueChange: (userId, value) =>
              this.store.dispatch(updateUserActiveFlag({ userId, value })),
          },
        };
      },
    },
    {
      field: 'banned',
      headerName: 'gebannt',
      cellRendererSelector: (params) => {
        return {
          component: 'checkboxRenderer',
          params: {
            value: params.data.banned,
            disabled: false,
            id: params.data.id,
            valueChange: (userId, value) =>
              this.store.dispatch(updateUserBannedFlag({ userId, value })),
          },
        };
      },
    },
    {
      field: 'admin',
      headerName: 'Admin',
      cellRendererSelector: (params) => {
        return {
          component: 'checkboxRenderer',
          params: {
            value: params.data.admin,
            disabled: false,
            id: params.data.id,
            valueChange: (userId, value) =>
              this.store.dispatch(updateUserAdminRole({ userId, value })),
          },
        };
      },
    },
    // {
    //   field: 'articleManager',
    //   headerName: 'Art.-Man.',
    //   cellRendererSelector: (params) => {
    //     return {
    //       component: 'checkboxRenderer',
    //       params: {
    //         value: params.data.articleManager,
    //         disabled: false,
    //         id: params.data.id,
    //         valueChange: (userId, value) =>
    //           this.store.dispatch(
    //             updateUserArticleManagerRole({ userId, value })
    //           ),
    //       },
    //     };
    //   },
    // },
  ];

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      checkboxRenderer: GridCheckboxComponent,
      profileRenderer: UserGridProfileLinkComponent,
    },
  };

  selectUsersSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private gridHelper: GridHelper,
    private router: Router,
  ) {
    this.usersLoading$ = this.store.select(selectUsersLoadingProgress);
    this.store.dispatch(loadUsers());
    this.selectUsersSub = this.store.select(selectUsers).subscribe((users) => {
      this.rowData = users;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectUsersSub.unsubscribe();
  }

  onCellValueChanged(event: CellValueChangedEvent) {}
}
