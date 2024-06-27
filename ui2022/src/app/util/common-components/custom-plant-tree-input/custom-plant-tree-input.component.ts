import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatError } from '@angular/material/form-field';
import { NgIf, CurrencyPipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { LanguageHelper } from '../../helper/language.helper';

@Component({
  selector: 'app-custom-plant-tree-input',
  templateUrl: './custom-plant-tree-input.component.html',
  styleUrls: ['./custom-plant-tree-input.component.scss'],
  standalone: true,
  imports: [
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatError,
    CurrencyPipe,
  ],
})
export class CustomPlantTreeInputComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  sum: number = 0;
  imgUrl: string;

  controlSub: Subscription;

  constructor(private languageHelper: LanguageHelper, private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.initControl();
    this.imgUrl =
      environment.backendUrl +
        '/treeType/image/' +
        this.formGroup.get('article').value.treeType.treeImageColor +
        '/90/90';
    this.controlSub = this.formGroup.get('amount').valueChanges.subscribe((amount) => {
      if (amount < 0) {
      } else {
        this.calcSum(amount);
      }
    });
  }

  initControl() {
    this.calcSum(this.formGroup.get('amount').value);
  }

  ngOnDestroy(): void {
    this.controlSub?.unsubscribe();
  }

  getTreetypeName(text: string) {
    return this.textHelper.getTextForLanguage(text, this.languageHelper.getUserLanguage());
  }

  onFocus() {
    if (!this.formGroup.get('amount').touched && this.formGroup.get('amount').value === 0) {
      this.formGroup.get('amount').setValue('');
    }
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
