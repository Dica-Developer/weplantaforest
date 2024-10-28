import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { loadProjectDetails } from 'src/app/store/project.store';
import { deleteProject } from '../../../store/project.store';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../common-components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { take } from 'rxjs';

@Component({
    selector: 'app-grid-project-actions',
    templateUrl: './grid-project-actions.component.html',
    styleUrls: ['./grid-project-actions.component.scss'],
    standalone: true,
    imports: [
        MatIconButton,
        MatTooltip,
        MatIcon,
    ],
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
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteProject({ id: this.projectId }));
      }
    });
  }
}

