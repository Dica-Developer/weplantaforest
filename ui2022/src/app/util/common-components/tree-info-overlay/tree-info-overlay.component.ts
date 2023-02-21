import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TreeType } from 'src/app/store/project.store';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { TextHelper } from '../../text.helper';

@Component({
  selector: 'app-tree-info-overlay',
  templateUrl: './tree-info-overlay.component.html',
  styleUrls: ['./tree-info-overlay.component.scss'],
})
export class TreeInfoOverlayComponent implements OnInit {
  @Input() currentTree: TreeType = null;
  selectedInfoType: string = 'leaf';
  @Output() treeinfoClosed = new EventEmitter();
  treeTypes$: Observable<TreeType[]>;
  selectTreetypesSub: Subscription;
  trees: TreeType[] = [];

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {
    this.store.dispatch(loadTreeTypes());
  }

  ngOnInit(): void {
    this.selectTreetypesSub = this.store.select(selectTreeTypes).subscribe((res) => {
      for (let tt of res) {
        this.trees.push({
          id: tt.id,
          imageFileName: tt.imageFileName,
          description: tt.description,
          name: this.textHelper.getTextForLanguage(tt.name, 'de'),
        });
      }
    });
  }

  closeOverlay() {
    this.treeinfoClosed.emit();
  }

  selectTree(tree: TreeType) {
    this.currentTree = tree;
  }
  selectInfoType(infoType: string) {
    this.selectedInfoType = infoType;
  }
}
