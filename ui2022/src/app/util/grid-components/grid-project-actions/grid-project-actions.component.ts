import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { loadProjectDetails } from 'src/app/store/project.store';

@Component({
  selector: 'app-grid-project-actions',
  templateUrl: './grid-project-actions.component.html',
  styleUrls: ['./grid-project-actions.component.scss'],
})
export class GridProjectActionsComponent implements ICellEditorAngularComp {
  projectId: number;

  constructor(private store: Store<AppState>) {}

  agInit(params: any): void {
    this.projectId = params.value;
  }

  getValue() {
    return this.projectId;
  }

  loadProjectDetails() {
    //add store dispatch here
    this.store.dispatch(loadProjectDetails({ id: this.projectId }));
  }
}
