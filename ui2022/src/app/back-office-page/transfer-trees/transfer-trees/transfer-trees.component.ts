import { Component, OnInit } from '@angular/core';
import {
  User,
  selectUsers,
  loadUsers,
  loadTreesForUser,
  selectAmountTreesForUser,
  transferTrees,
} from '../../../store/user.store';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-transfer-trees',
  templateUrl: './transfer-trees.component.html',
  styleUrls: ['./transfer-trees.component.scss'],
})
export class TransferTreesComponent implements OnInit {
  allUsers: User[];
  allUsersSub: Subscription;

  filteredOptionsFromUser: User[];
  filterControlFromUser = new FormControl('');
  filterControlVCFromUserSub: Subscription;

  filteredOptionsToUser: User[];
  filterControlToUser = new FormControl('');
  filterControlVCToUserSub: Subscription;

  fromUser = new FormControl(null);
  toUser = new FormControl(null);

  amountOfTrees$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.amountOfTrees$ = this.store.select(selectAmountTreesForUser);
    this.allUsersSub = this.store.select(selectUsers).subscribe((res) => {
      this.allUsers = res;
      if (this.allUsers.length == 0) {
        this.store.dispatch(loadUsers());
      }
    });

    this.filterControlVCFromUserSub =
      this.filterControlFromUser.valueChanges.subscribe((res) => {
        // if user object selected, set name as control value and id for eventForm userId value
        if (res?.id) {
          this.filterControlFromUser.setValue(res.name);
          this.fromUser.setValue(res.id);
          this.store.dispatch(loadTreesForUser({ userId: res.id }));
        } else {
          // if value is string --> filter options
          this.filteredOptionsFromUser = this._filter(res);
        }
      });

    this.filterControlVCToUserSub =
      this.filterControlToUser.valueChanges.subscribe((res) => {
        // if user object selected, set name as control value and id for eventForm userId value
        if (res?.id) {
          this.filterControlToUser.setValue(res.name);
          this.toUser.setValue(res.id);
        } else {
          // if value is string --> filter options
          this.filteredOptionsToUser = this._filter(res);
        }
      });
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  removeFromUser() {
    this.filterControlFromUser.setValue('');
    this.fromUser.setValue(null);
  }

  removeToUser() {
    this.filterControlToUser.setValue('');
    this.toUser.setValue(null);
  }

  transferTrees() {
    this.store.dispatch(
      transferTrees({
        fromUserId: this.fromUser.value,
        toUserId: this.toUser.value,
      })
    );
  }
}
