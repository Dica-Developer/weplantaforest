import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {
  TreeType,
  deleteArticle,
  deleteArticleWithoutId,
} from '../../../../store/project.store';
import { selectTreeTypes } from '../../../../store/treeType.store';
import { TextHelper } from '../../../../util/text.helper';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-edit-tree',
  templateUrl: './project-edit-tree.component.html',
  styleUrls: ['./project-edit-tree.component.scss'],
})
export class ProjectEditTreeComponent implements OnInit {
  controlObj: FormGroup;
  treeTypes: TreeType[] = [];

  @Input() set control(control: FormGroup) {
    this.controlObj = control;
  }

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    public dialog: MatDialog
  ) {
    store.select(selectTreeTypes).subscribe((res) => {
      for (let tt of res) {
        this.treeTypes.push({
          id: tt.id,
          name: this.textHelper.getTextForLanguage(tt.name, 'de'),
        });
      }
    });
  }

  ngOnInit(): void {}

  treeTypeChanged($event) {
    this.controlObj.get('treeType').get('id').setValue($event.value);
  }

  openDeleteConfirmation() {
    const dialogRef = this.dialog.open(DeleteArticleConfirmationDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.controlObj.get('articleId').value) {
          this.store.dispatch(
            deleteArticle({ id: this.controlObj.get('articleId').value })
          );
        } else {
          this.store.dispatch(
            deleteArticleWithoutId({ article: this.controlObj.value })
          );
        }
      }
    });
  }
}

@Component({
  selector: 'delete-article-confirmation-dialog',
  templateUrl: 'delete-article-confirmation-dialog.html',
})
export class DeleteArticleConfirmationDialog {}
