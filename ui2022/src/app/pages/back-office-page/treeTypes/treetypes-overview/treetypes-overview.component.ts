import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  loadTreeTypesForAdmin,
  TreeTypeAdmin,
  selectTreeTypesForAdmin,
  addTreeType,
} from '../../../../store/treeType.store';
import { Observable } from 'rxjs';
import { TreetypeEditComponent } from '../treetype-edit/treetype-edit.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-treetypes-overview',
    templateUrl: './treetypes-overview.component.html',
    styleUrls: ['./treetypes-overview.component.scss'],
    standalone: true,
    imports: [
        MatButton,
        NgFor,
        TreetypeEditComponent,
        AsyncPipe,
    ],
})
export class TreetypesOverviewComponent implements OnInit {
  treeTypes$: Observable<TreeTypeAdmin[]>;

  constructor(private store: Store<AppState>) {
    store.dispatch(loadTreeTypesForAdmin());
  }

  ngOnInit(): void {
    this.treeTypes$ = this.store.select(selectTreeTypesForAdmin);
  }

  createTreeType() {
    const treeType: TreeTypeAdmin = {
      id: null,
      name: '',
      leaf: '',
      fruit: '',
      trunk: '',
      description: '',
      infoLink: '',
      annualCo2SavingInTons: 0.01,
      treeImageColor: null,
      treeImageBW: null,
      fruitImageColor: null,
      leafImage: null,
      trunkImageColor: null,
    };
    this.store.dispatch(addTreeType({ treeType }));
  }
}
