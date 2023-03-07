import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';
import { createCartFromPlantBag, selectCartForPaymentCreated } from 'src/app/store/payment.store';
import { AppState } from '../../store/app.state';
import {
  createPlantbagForBackend,
  selectPlantbag,
  selectPlantbagPrice,
} from '../../store/plantbag.store';

@Component({
  selector: 'app-plantbag-page',
  templateUrl: './plantbag-page.component.html',
  styleUrls: ['./plantbag-page.component.scss'],
})
export class PlantbagPageComponent implements OnInit, OnDestroy {
  plantBagPrice$ = this.store.select(selectPlantbagPrice);
  plantBag$ = this.store.select(selectPlantbag);

  cartCreatedSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.cartCreatedSub = this.store.select(selectCartForPaymentCreated).subscribe((created) => {
      if (created) {
        this.router.navigateByUrl('/paymentOptions');
      }
    });
  }

  ngOnDestroy(): void {
    this.cartCreatedSub?.unsubscribe();
  }

  convertPlantBagToCart() {
    this.plantBag$.pipe(first()).subscribe((plantBagState) => {
      const plantBag = createPlantbagForBackend(plantBagState);
      this.store.dispatch(createCartFromPlantBag({ plantBag }));
    });
  }
}
