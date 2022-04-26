import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { loadProjectDetails } from 'src/app/store/project.store';
import { deleteProject } from '../../../store/project.store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grid-project-actions',
  templateUrl: './grid-project-actions.component.html',
  styleUrls: ['./grid-project-actions.component.scss'],
})
export class GridProjectActionsComponent implements ICellEditorAngularComp {
  projectId: number;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

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

  deleteProject() {
    const dialogRef = this.dialog.open(DeleteProjectConfirmationDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteProject({ id: this.projectId }));
      }
    });
  }
}


@Component({
  selector: 'delete-project-confirmation-dialog',
  templateUrl: 'delete-project-confirmation-dialog.html',
})
export class DeleteProjectConfirmationDialog {}
