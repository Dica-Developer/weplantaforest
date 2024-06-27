import { Component, OnInit } from '@angular/core';
import {
  User,
  selectUsers,
  loadUsers,
  loadTreesForUser,
  selectAmountTreesForUser,
  transferTrees,
} from '../../../../store/user.store';
import { Subscription, Observable } from 'rxjs';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'app-transfer-trees',
    templateUrl: './transfer-trees.component.html',
    styleUrls: ['./transfer-trees.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        MatAutocompleteTrigger,
        ReactiveFormsModule,
        NgIf,
        MatIcon,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatButton,
        AsyncPipe,
    ],
})
export class TransferTreesComponent implements OnInit {
  allUsers: User[];
  allUsersSub: Subscription;

  filteredOptionsFromUser: User[];
  filterControlFromUser = new UntypedFormControl('');
  filterControlVCFromUserSub: Subscription;

  filteredOptionsToUser: User[];
  filterControlToUser = new UntypedFormControl('');
  filterControlVCToUserSub: Subscription;

  fromUser = new UntypedFormControl(null);
  toUser = new UntypedFormControl(null);

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

    this.filterControlVCFromUserSub = this.filterControlFromUser.valueChanges.subscribe((res) => {
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

    this.filterControlVCToUserSub = this.filterControlToUser.valueChanges.subscribe((res) => {
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
    return this.allUsers.filter((user) => user.name.toLowerCase().includes(filterValue));
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
      }),
    );
  }
}
