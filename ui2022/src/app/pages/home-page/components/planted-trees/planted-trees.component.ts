import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getAllTrees, selectAllTreeCount } from "src/app/store/tree.store";
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { CircleIconComponent } from '../../../../util/common-components/icons/circle-icon/circle-icon.component';

@Component({
  selector: 'app-planted-trees',
  templateUrl: './planted-trees.component.html',
  styleUrls: ['./planted-trees.component.scss'],
  standalone: true,
  imports: [
    CircleIconComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class PlantedTreesComponent implements OnInit {
  treeCount$ = this.store.select(selectAllTreeCount);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllTrees());
  }

  ngOnInit(): void {}
}
