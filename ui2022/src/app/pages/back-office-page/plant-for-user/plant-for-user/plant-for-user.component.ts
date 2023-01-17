import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {
  createPlantbagForBackend,
  PlantbagState,
  selectPlantbag,
  plantForUser,
} from '../../../../store/plantbag.store';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/store/user.store';
import { loadUsers, selectUsers } from '../../../../store/user.store';
import { selectActiveProjects, loadActiveProjects } from '../../../../store/project.store';
import { addError } from 'src/app/store/error.state';

@Component({
  selector: 'app-plant-for-user',
  templateUrl: './plant-for-user.component.html',
  styleUrls: ['./plant-for-user.component.scss'],
})
export class PlantForUserComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup = this.fb.group({
    userId: new UntypedFormControl(null),
    userName: new UntypedFormControl(null),
  });

  plantbag: PlantbagState;
  plantbagSub: Subscription;

  allUsers: User[];
  allUsersSub: Subscription;
  filteredOptions: User[];
  filterControl = new UntypedFormControl('');
  filterControlVCSub: Subscription;

  activeProjects$: Observable<any>;

  constructor(private store: Store<AppState>, private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(loadActiveProjects());
    this.activeProjects$ = this.store.select(selectActiveProjects);
    this.plantbagSub = this.store.select(selectPlantbag).subscribe((res) => {
      this.plantbag = res;
    });
    this.allUsersSub = this.store.select(selectUsers).subscribe((res) => {
      this.allUsers = res;
      if (this.allUsers.length == 0) {
        this.store.dispatch(loadUsers());
      }
    });
    this.filterControlVCSub = this.filterControl.valueChanges.subscribe((res) => {
      // if user object selected, set name as control value and id for eventForm userId value
      if (res?.id) {
        this.filterControl.setValue(res.name);
        this.form.get('userId').setValue(res.id);
        this.form.get('userName').setValue(res.name);
      } else {
        // if value is string --> filter options
        this.filteredOptions = this._filter(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.plantbagSub.unsubscribe();
    this.allUsersSub.unsubscribe();
    this.filterControlVCSub.unsubscribe();
  }

  plant() {
    let treeSum = 0;
    this.plantbag.plantbagItems.forEach((pbi) => (treeSum += pbi.amount));
    if (!this.form.get('userId').value) {
      this.store.dispatch(
        addError({ error: { key: 'USER_NOT_SET', message: 'Der User muss ausgewählt sein' } }),
      );
    } else if (treeSum == 0) {
      this.store.dispatch(
        addError({
          error: {
            key: 'NO_TREES_SET',
            message: 'Ein Baum muss mindestens in den Pflanzkorb gepackt werden',
          },
        }),
      );
    } else {
      const plantBag = createPlantbagForBackend(this.plantbag);
      const request = {
        plantBag,
        amountOfPlantBags: 1,
        cartState: 'CALLBACK',
        userId: this.form.get('userId').value,
      };
      this.store.dispatch(plantForUser({ request }));
    }
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.allUsers.filter((user) => user.name.toLowerCase().includes(filterValue));
  }

  removeUser() {
    this.filterControl.setValue('');
    this.form.get('userId').setValue(null);
    this.form.get('userName').setValue(null);
  }
}
