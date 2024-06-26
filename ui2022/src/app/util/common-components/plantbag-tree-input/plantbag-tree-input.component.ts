import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveProjectArticle } from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { Subscription } from 'rxjs';
import { addPlantbagItem, removePlantbagItem } from '../../../store/plantbag.store';
import { environment } from '../../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { NgIf, CurrencyPipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { PlatformHelper } from '../../helper/platform.helper';
import { LanguageHelper } from '../../helper/language.helper';

@Component({
  selector: 'app-plantbag-tree-input',
  templateUrl: './plantbag-tree-input.component.html',
  styleUrls: ['./plantbag-tree-input.component.scss'],
  standalone: true,
  imports: [
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatError,
    MatIconButton,
    MatTooltip,
    MatIcon,
    CurrencyPipe,
    TranslateModule,
  ],
})
export class PlantbagTreeInputComponent implements OnInit, OnDestroy {
  @Input()
  article: ActiveProjectArticle;

  @Input()
  amount: number = null;

  @Input()
  withDelete: boolean = false;

  @Input()
  showProject: boolean = false;

  control: UntypedFormControl;
  controlVcSub: Subscription;
  sum: number = 0;
  imgUrl: string;

  constructor(
    private languageHelper: LanguageHelper,
    private platformHelper: PlatformHelper,
    private store: Store<AppState>,
    private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.initControl();
    this.imgUrl =
      environment.backendUrl + '/treeType/image/' + this.article.treeType.treeImageColor + '/90/90';
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
      this.store.dispatch(addPlantbagItem({ item: { article: this.article, amount: res } }));
      //#763
      // since there are new plantbag items after changing the amount, the focus gets lost when changing the input
      // so we look for the input element with their id (--> 'article-' + articleId) and focus it again programmatically
      setTimeout(() => {
        if (this.platformHelper.checkIfBrowser()){
          let el = document.getElementById('article-' + this.article.articleId);
          el.focus();
          let mel = document.getElementById('m-article-' + this.article.articleId);
          mel.focus();
        }
      }, 10);
    });
  }

  ngOnDestroy(): void {
    this.controlVcSub.unsubscribe();
  }

  getTreetypeName(text: string) {
    return this.textHelper.getTextForLanguage(text, this.languageHelper.getUserLanguage());
  }

  getErrorMessage() {
    return 'max. ' + (this.article.amount - this.article.alreadyPlanted);
  }

  calcSum(amount: number) {
    this.sum = (amount * this.article.price.priceAsLong) / 100;
  }

  removeItemFormPlantbag() {
    this.store.dispatch(removePlantbagItem({ articleId: this.article.articleId }));
  }
}
