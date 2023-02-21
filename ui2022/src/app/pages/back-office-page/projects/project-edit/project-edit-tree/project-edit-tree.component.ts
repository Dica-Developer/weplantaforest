import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {
  TreeType,
  deleteArticle,
  deleteArticleWithoutId,
} from '../../../../../store/project.store';
import { selectTreeTypes } from '../../../../../store/treeType.store';
import { TextHelper } from '../../../../../util/text.helper';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-edit-tree',
  templateUrl: './project-edit-tree.component.html',
  styleUrls: ['./project-edit-tree.component.scss'],
})
export class ProjectEditTreeComponent implements OnInit, OnDestroy {
  controlObj: UntypedFormGroup;
  treeTypes: TreeType[] = [];

  @Input() set control(control: UntypedFormGroup) {
    this.controlObj = control;
  }

  @Input()
  index: number;

  @Output()
  articleRemoved = new EventEmitter<number>();

  selectTreetypesSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private textHelper: TextHelper,
    public dialog: MatDialog,
  ) {
    this.selectTreetypesSub = store.select(selectTreeTypes).subscribe((res) => {
      for (let tt of res) {
        this.treeTypes.push({
          id: tt.id,
          imageFileName: tt.imageFileName,
          description: tt.description,
          name: this.textHelper.getTextForLanguage(tt.name, 'de'),
        });
      }
      console.log(res);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectTreetypesSub.unsubscribe();
  }

  treeTypeChanged($event) {
    this.controlObj.get('treeType').get('id').setValue($event.value);
  }

  openDeleteConfirmation() {
    const dialogRef = this.dialog.open(DeleteArticleConfirmationDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.articleRemoved.emit(this.index);
        if (this.controlObj.get('articleId').value) {
          this.store.dispatch(deleteArticle({ id: this.controlObj.get('articleId').value }));
        } else {
          this.store.dispatch(
            deleteArticleWithoutId({ article: this.controlObj.value, index: this.index }),
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
