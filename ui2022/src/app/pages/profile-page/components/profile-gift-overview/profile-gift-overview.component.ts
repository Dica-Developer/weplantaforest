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
  resetPlantbag,
  addPlantbag,
  selectPlantbagValid,
  setPlantbagValid,
} from '../../../../store/plantbag.store';
import { openGiftPdf, ProfileGift } from '../../../../store/profile.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-gift-overview',
  templateUrl: './profile-gift-overview.component.html',
  styleUrls: ['./profile-gift-overview.component.scss'],
})
export class ProfileGiftOverviewComponent implements OnInit, OnDestroy {
  @Input()
  recipientGifts: ProfileGift[];

  @Input()
  consignorGifts: ProfileGift[];

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
    
  }
}
