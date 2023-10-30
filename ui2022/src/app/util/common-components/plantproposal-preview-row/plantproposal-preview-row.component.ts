import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TextHelper } from 'src/app/util/text.helper';
import { environment } from 'src/environments/environment';
import { selectUserLanguage } from '../../../store/profile.store';

@Component({
  selector: 'app-plantproposal-preview-row',
  templateUrl: './plantproposal-preview-row.component.html',
  styleUrls: ['./plantproposal-preview-row.component.scss'],
})
export class PlantproposalPreviewRowComponent implements OnInit, OnDestroy {
  @Input() plantItem: any;

  imageUrl: string;
  sum: number = 0;

  userLanuage: string;
  userLanuguageSub: Subscription;

  constructor(private textHelper: TextHelper, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.imageUrl =
      environment.backendUrl + '/treeType/image/' + this.plantItem.imageFile + '/90/90';
    this.calcSum(this.plantItem.amount);
    this.userLanuguageSub = this.store.select(selectUserLanguage).subscribe((userLanguage) => {
      this.userLanuage = userLanguage;
    });
  }

  ngOnDestroy() {
    this.userLanuguageSub?.unsubscribe();
  }

  getTreetypeName(text: string) {
    return this.textHelper.getTextForLanguage(text, this.userLanuage);
  }

  calcSum(amount: number) {
    this.sum = (amount * this.plantItem.treePrice) / 100;
  }
}
