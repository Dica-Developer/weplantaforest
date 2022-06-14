import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from "src/app/store/app.state";
import { loadTreeTypesForAdmin, TreeTypeAdmin, selectTreeTypesForAdmin } from '../../../store/treeType.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-treetypes-overview',
  templateUrl: './treetypes-overview.component.html',
  styleUrls: ['./treetypes-overview.component.scss']
})
export class TreetypesOverviewComponent implements OnInit {

  treeTypes$: Observable<TreeTypeAdmin[]>;

  constructor(private store: Store<AppState>) {
    store.dispatch(loadTreeTypesForAdmin());
   }

  ngOnInit(): void {
    this.treeTypes$ = this.store.select(selectTreeTypesForAdmin);
  }

}
