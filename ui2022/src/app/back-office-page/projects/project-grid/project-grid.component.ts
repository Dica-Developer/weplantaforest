import { Component, OnInit } from '@angular/core';
import { CellValueChangedEvent, ColDef, GridOptions } from 'ag-grid-community';
import { AppState } from 'src/app/store/app.state';
import { GridHelper } from '../../../util/grid.helper';
import { Store } from '@ngrx/store';
import {
  selectProjects,
  selectProjectsLoading,
} from '../../../store/project.store';
import { Observable } from 'rxjs';
import { loadProjects } from '../../../store/project.store';
import { GridProjectActionsComponent } from '../../../util/grid-components/grid-project-actions/grid-project-actions.component';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
})
export class ProjectGridComponent implements OnInit {
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
          component: 'projectActionRenderer',
          value: params.data.id,
        }
      }
    }
  ];

  rowData = [];

  projectsLoading$: Observable<boolean>;

  gridOptions: GridOptions = {
    rowData: [],
    components: {
      projectActionRenderer: GridProjectActionsComponent
    },
  };

  constructor(private store: Store<AppState>, private gridHelper: GridHelper) {
    store.select(selectProjects).subscribe((projects) => {
      this.rowData = projects;
    });
    this.store.dispatch(loadProjects());
    this.projectsLoading$ = this.store.select(selectProjectsLoading);
  }

  ngOnInit(): void {}

  onCellValueChanged(event: CellValueChangedEvent) {}
}
