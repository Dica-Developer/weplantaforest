import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, PagedData } from '../../../../store/app.state';
import { loadTreesByUser, ProfileTree } from '../../../../store/profile.store';

@Component({
  selector: 'app-profile-trees',
  templateUrl: './profile-trees.component.html',
  styleUrls: ['./profile-trees.component.scss'],
})
export class ProfileTreesComponent implements OnInit {
  @Input()
  trees: PagedData<ProfileTree>;

  @Input()
  userName: string;

  page: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  nextPage() {
    this.page++;
    this.store.dispatch(loadTreesByUser({ username: this.userName, page: this.page, size: 8 }));
  }

  previousPage() {
    this.page--;
    this.store.dispatch(loadTreesByUser({ username: this.userName, page: this.page, size: 8 }));
  }
}
