import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getAllTrees, selectAllTreeCount } from 'src/app/store/tree.store';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TreeIconComponent } from '../../../../util/common-components/icons/tree-icon/tree-icon.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        TreeIconComponent,
        RouterLink,
        AsyncPipe,
        TranslateModule,
    ],
})
export class HeaderComponent implements OnInit {
  treeCount$ = this.store.select(selectAllTreeCount);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllTrees());
  }

  ngOnInit(): void {}
}
