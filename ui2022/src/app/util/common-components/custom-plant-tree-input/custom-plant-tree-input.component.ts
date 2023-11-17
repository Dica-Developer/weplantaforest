import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { TextHelper } from '../../text.helper';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { selectUserLanguage } from '../../../store/profile.store';

@Component({
  selector: 'app-custom-plant-tree-input',
  templateUrl: './custom-plant-tree-input.component.html',
  styleUrls: ['./custom-plant-tree-input.component.scss'],
})
export class CustomPlantTreeInputComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  sum: number = 0;
  imgUrl: string;

  userLanuage: string;
  userLanuguageSub: Subscription;
  controlSub: Subscription;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.initControl();
    this.imgUrl =
      environment.backendUrl +
      '/treeType/image/' +
      this.formGroup.get('article').value.treeType.treeImageColor +
      '/90/90';
    this.userLanuguageSub = this.store.select(selectUserLanguage).subscribe((userLanguage) => {
      this.userLanuage = userLanguage;
    });
    this.controlSub = this.formGroup.get('amount').valueChanges.subscribe((amount) => {
      if (amount < 0) {
      } else {
        this.calcSum(amount);
      }
    });
    console.log(this.formGroup.value);
  }

  initControl() {
    this.calcSum(this.formGroup.get('amount').value);
  }

  ngOnDestroy(): void {
    this.userLanuguageSub?.unsubscribe();
    this.controlSub?.unsubscribe();
  }

  getTreetypeName(text: string) {
    return this.textHelper.getTextForLanguage(text, this.userLanuage);
  }

  getErrorMessage() {
    return (
      'max. ' +
      (this.formGroup.get('article').value.amount -
        this.formGroup.get('article').value.alreadyPlanted)
    );
  }

  calcSum(amount: number) {
    this.sum = (amount * this.formGroup.get('article').value.price.priceAsLong) / 100;
  }
}
