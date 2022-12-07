import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActiveProjectArticle } from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { TextHelper } from '../../text.helper';
import { Subscription } from 'rxjs';
import {
  addPlantbagItem,
  removePlantbagItem,
} from '../../../store/plantbag.store';

@Component({
  selector: 'app-plantbag-tree-input',
  templateUrl: './plantbag-tree-input.component.html',
  styleUrls: ['./plantbag-tree-input.component.scss'],
})
export class PlantbagTreeInputComponent implements OnInit, OnDestroy {
  @Input()
  article: ActiveProjectArticle;

  @Input()
  amount: number = 0;

  @Input()
  withDelete: boolean = false;

  @Input()
  showProject: boolean = false;

  control: UntypedFormControl;
  controlVcSub: Subscription;
  sum: number = 0;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.initControl();
  }

  initControl() {
    this.control = new UntypedFormControl(this.amount, [
      Validators.max(this.article.amount - this.article.alreadyPlanted),
      Validators.min(0),
    ]);
    this.calcSum(this.amount);
    if (this.controlVcSub) {
      this.controlVcSub.unsubscribe();
    }
    this.controlVcSub = this.control.valueChanges.subscribe((res) => {
      this.calcSum(res);
      this.store.dispatch(
        addPlantbagItem({ item: { article: this.article, amount: res } })
      );
    });
  }

  ngOnDestroy(): void {
    this.controlVcSub.unsubscribe();
  }

  getGerman(text: string) {
    return this.textHelper.getTextForLanguage(text, 'de');
  }

  getErrorMessage() {
    return (
      'max. ' + (this.article.amount - this.article.alreadyPlanted) + ' Bäume'
    );
  }

  calcSum(amount: number) {
    this.sum = (amount * this.article.price.priceAsLong) / 100;
  }

  removeItemFormPlantbag() {
    this.store.dispatch(
      removePlantbagItem({ articleId: this.article.articleId })
    );
  }
}
