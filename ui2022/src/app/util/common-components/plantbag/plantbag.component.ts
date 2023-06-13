import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { PlantbagState, selectPlantbag, selectPlantbagPrice } from '../../../store/plantbag.store';
import { Observable, Subscription, take } from 'rxjs';
import { TextHelper } from '../../text.helper';
import { FormControl } from '@angular/forms';
import { selectIsGift, setGift } from 'src/app/store/payment.store';

@Component({
  selector: 'app-plantbag',
  templateUrl: './plantbag.component.html',
  styleUrls: ['./plantbag.component.scss'],
})
export class PlantbagComponent implements OnInit, OnDestroy {
  plantbag$: Observable<PlantbagState>;

  plantbagPrice: Observable<number>;

  giftSelectSub: Subscription;
  giftControl = new FormControl(false);
  giftControlSub: Subscription;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.plantbag$ = this.store.select(selectPlantbag);
    this.plantbagPrice = this.store.select(selectPlantbagPrice);
    this.giftSelectSub = this.store
      .select(selectIsGift)
      .pipe(take(1))
      .subscribe((isGift) => {
        this.giftControl.setValue(isGift);
      });
    this.giftControlSub = this.giftControl.valueChanges.subscribe((isGift) => {
      this.store.dispatch(setGift({ isGift }));
    });
  }

  ngOnDestroy(): void {
    this.giftSelectSub?.unsubscribe();
    this.giftControlSub?.unsubscribe();
  }

  getGermanText(text: string): string {
    return this.textHelper.getTextForLanguage(text, 'de');
  }
}
