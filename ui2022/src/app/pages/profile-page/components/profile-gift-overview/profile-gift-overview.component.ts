import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  getProjectsForCustomPlanting,
  selectProjectsForCustomPlanting,
} from '../../../../store/plant.store';
import { AppState } from '../../../../store/app.state';
import {
  convertCartToPlantbag,
  createPlantbagForBackend,
  validatePlantbag,
  addPlantbag,
  selectPlantbagValid,
  setPlantbagValid,
} from '../../../../store/plantbag.store';
import { openGiftPdf, ProfileGift } from '../../../../store/profile.store';
import { Router } from '@angular/router';
import { setGift } from '../../../../store/payment.store';

@Component({
  selector: 'app-profile-gift-overview',
  templateUrl: './profile-gift-overview.component.html',
  styleUrls: ['./profile-gift-overview.component.scss'],
})
export class ProfileGiftOverviewComponent implements OnInit, OnDestroy {
  _recipientGifts: ProfileGift[];
  _consignorGifts: ProfileGift[];
  displayedColumns: string[] = ['code', 'trees', 'price', 'consignedBy', 'PDF', 'recreate'];
  dataSourceRecipient;
  dataSourceConsigner;

  @Input()
  set recipientGifts(gifts: ProfileGift[]) {
    this._recipientGifts = gifts;
    this.recipientGiftPages = new Map<number, ProfileGift[]>();
    let pageCnt = 0;
    if (gifts && gifts.length > 0) {
      for (let i = 0; i < gifts.length; i += 5) {
        const chunk = gifts.slice(i, i + 5);
        this.recipientGiftPages.set(pageCnt, chunk);
        pageCnt++;
      }
    } else {
      this.recipientGiftPages.set(0, []);
    }
  }

  get recipientGifts() {
    return this._recipientGifts;
  }

  @Input()
  set consignorGifts(gifts: ProfileGift[]) {
    this._consignorGifts = gifts;
    this.consignorGiftPages = new Map<number, ProfileGift[]>();
    let pageCnt = 0;
    if (gifts && gifts.length > 0) {
      for (let i = 0; i < gifts.length; i += 5) {
        const chunk = gifts.slice(i, i + 5);
        this.consignorGiftPages.set(pageCnt, chunk);
        pageCnt++;
      }
      this.dataSourceConsigner = this.consignorGiftPages.get(0);
    } else {
      this.consignorGiftPages.set(0, []);
    }
  }

  get consignorGifts() {
    return this._consignorGifts;
  }

  consignorGiftPages: Map<number, ProfileGift[]> = new Map<number, ProfileGift[]>();
  recipientGiftPages: Map<number, ProfileGift[]> = new Map<number, ProfileGift[]>();

  activeConsignorGiftPage: number = 0;
  activeRecipientGiftPage: number = 0;

  activeProjectsSub: Subscription;

  activeProjects;

  plantbagValidSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(setPlantbagValid({ valid: false }));
    this.store.dispatch(getProjectsForCustomPlanting());
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects;
      });

    this.plantbagValidSub = this.store.select(selectPlantbagValid).subscribe((valid) => {
      if (valid) {
        this.store.dispatch(setGift({ isGift: true }));
        this.router.navigateByUrl('/plantbag');
      }
    });
  }

  ngOnDestroy(): void {
    this.activeProjectsSub?.unsubscribe();
    this.plantbagValidSub?.unsubscribe();
  }

  openGiftPdf(id: number) {
    this.store.dispatch(openGiftPdf({ id }));
  }

  recreateGift(gift) {
    let plantBag = convertCartToPlantbag(gift.code.cart, this.activeProjects);
    let plantBagForBackend = createPlantbagForBackend(plantBag);
    const request = {
      plantBag: plantBagForBackend,
    };
    this.store.dispatch(
      validatePlantbag({ request, followUpAction: addPlantbag({ items: plantBag.plantbagItems }) }),
    );
  }

  createGift() {
    this.store.dispatch(setGift({ isGift: true }));
    this.router.navigateByUrl('/plant');
  }

  setConsignorGiftPage(page: number) {
    this.activeConsignorGiftPage = page;
  }

  setRecipientGiftPage(page: number) {
    this.activeRecipientGiftPage = page;
  }
}
