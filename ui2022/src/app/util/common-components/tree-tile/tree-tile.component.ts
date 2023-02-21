import { Component, Input, OnInit } from '@angular/core';
import { TreeType } from 'src/app/store/project.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tree-tile',
  templateUrl: './tree-tile.component.html',
  styleUrls: ['./tree-tile.component.scss'],
})
export class TreeTileComponent implements OnInit {
  @Input()
  tree: TreeType;

  treeUrl = environment.baseUrl + '/assets/laerche.svg';

  constructor() {}

  ngOnInit(): void {
    this.treeUrl =
      environment.backendUrl + '/treeType/image/' + this.tree?.imageFileName + '/60/60';
  }
}
