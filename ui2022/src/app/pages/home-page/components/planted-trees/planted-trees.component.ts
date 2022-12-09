import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { selectAllTreeCount } from "src/app/store/tree.store";

@Component({
  selector: 'app-planted-trees',
  templateUrl: './planted-trees.component.html',
  styleUrls: ['./planted-trees.component.scss'],
})
export class PlantedTreesComponent implements OnInit {
  treeCount$ = this.store.select(selectAllTreeCount);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}
