import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';
import {
  createCartFromPlantBag,
  createGiftFromPlantBag,
  resetCreatedCartId,
  resetCreatedGiftId,
  selectCartForPaymentCreated,
  selectIsGift,
} from '../../store/payment.store';
import { AppState } from '../../store/app.state';
import {
  createPlantbagForBackend,
  selectPlantbag,
  selectPlantbagPrice,
} from '../../store/plantbag.store';
import { selectAuthenticated } from '../../store/auth.store';
import { TranslateModule } from '@ngx-translate/core';
import { NotAuthenticatedWarningComponent } from '../../util/common-components/not-authenticated-warning/not-authenticated-warning.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { PlantbagComponent } from '../../util/common-components/plantbag/plantbag.component';

@Component({
    selector: 'app-plantbag-page',
    templateUrl: './plantbag-page.component.html',
    styleUrls: ['./plantbag-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        PlantbagComponent,
        NgIf,
        NotAuthenticatedWarningComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class PlantbagPageComponent implements OnInit, OnDestroy {
  plantBagPrice$ = this.store.select(selectPlantbagPrice);
  plantBag$ = this.store.select(selectPlantbag);

  cartCreatedSub: Subscription;

  plantBagSub: Subscription;

  isGift: boolean;
  giftSub: Subscription;

  loggedIn$ = this.store.select(selectAuthenticated);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.store.dispatch(resetCreatedCartId());
    this.store.dispatch(resetCreatedGiftId());
    this.cartCreatedSub = this.store.select(selectCartForPaymentCreated).subscribe((created) => {
      if (created) {
        this.router.navigateByUrl('/paymentOptions');
      }
    });

    this.giftSub = this.store.select(selectIsGift).subscribe((isGift) => {
      this.isGift = isGift;
    });
  }

  ngOnDestroy(): void {
    this.cartCreatedSub?.unsubscribe();
    this.plantBagSub?.unsubscribe();
    this.giftSub?.unsubscribe();
  }

  convertPlantBagToCart() {
    this.plantBagSub = this.plantBag$.pipe(first()).subscribe((plantBagState) => {
      const plantBag = createPlantbagForBackend(plantBagState);
      if (this.isGift) {
        this.store.dispatch(createGiftFromPlantBag({ plantBag }));
      } else {
        this.store.dispatch(createCartFromPlantBag({ plantBag }));
      }
    });
  }
}
