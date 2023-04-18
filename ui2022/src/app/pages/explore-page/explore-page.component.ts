import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TreeType } from 'src/app/store/project.store';
import { loadTreeTypes, selectTreeTypes } from 'src/app/store/treeType.store';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
})
export class ExplorePageComponent implements OnInit {
  @Input() currentTree: TreeType = null;
  selectedInfoType: string = 'leaf';
  currentImageUrl: string = '';
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

  selectTree(tree: TreeType) {
    this.currentTree = tree;
    this.currentImageUrl =
      environment.backendUrl + '/treeType/image/' + tree.imageFileName + '/60/60';
  }
  selectInfoType(infoType: string) {
    this.selectedInfoType = infoType;
  }
}
