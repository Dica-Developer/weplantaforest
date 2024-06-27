import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TextHelper } from 'src/app/util/helper/text.helper';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { LanguageHelper } from '../../helper/language.helper';

@Component({
    selector: 'app-plantproposal-preview-row',
    templateUrl: './plantproposal-preview-row.component.html',
    styleUrls: ['./plantproposal-preview-row.component.scss'],
    standalone: true,
    imports: [CurrencyPipe, TranslateModule],
})
export class PlantproposalPreviewRowComponent implements OnInit {
  @Input() plantItem: any;

  imageUrl: string;
  sum: number = 0;

  constructor(private languageHelper: LanguageHelper, private textHelper: TextHelper, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendUrl + '/treeType/image/' + this.plantItem.imageFile + '/90/90';
    this.calcSum(this.plantItem.amount);
  }

  getTreetypeName(text: string) {
    return this.textHelper.getTextForLanguage(text, this.languageHelper.getUserLanguage());
  }

  calcSum(amount: number) {
    this.sum = (amount * this.plantItem.treePrice) / 100;
  }
}
