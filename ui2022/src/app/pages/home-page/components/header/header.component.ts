import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAllTrees, selectAllTreeCount } from 'src/app/store/tree.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  treeCount$ = this.store.select(selectAllTreeCount);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllTrees());
  }

  ngOnInit(): void {}
}
