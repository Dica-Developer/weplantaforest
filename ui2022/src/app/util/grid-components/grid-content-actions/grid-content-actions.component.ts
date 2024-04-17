import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { deleteContentArticle } from '../../../store/content.store';
import { DeleteConfirmationDialogComponent } from '../../common-components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-grid-content-actions',
  templateUrl: './grid-content-actions.component.html',
  styleUrls: ['./grid-content-actions.component.scss'],
})
export class GridContentActionsComponent implements ICellEditorAngularComp {
  articleId: number;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  agInit(params: any): void {
    this.articleId = params.value;
  }

  getValue() {
    return this.articleId;
  }

  deleteArticle() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteContentArticle({ id: this.articleId }));
      }
    });
  }
}

