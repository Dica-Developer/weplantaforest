import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createCertificate, ProfileCart } from '../../../../store/profile.store';
import { AppState } from '../../../../store/app.state';

@Component({
  selector: 'app-profile-certificates',
  templateUrl: './profile-certificates.component.html',
  styleUrls: ['./profile-certificates.component.scss'],
})
export class ProfileCertificatesComponent implements OnInit, OnDestroy {
  @Input() carts: ProfileCart[] = [];

  translationSub: Subscription;

  customTextControl: FormControl = new FormControl('');

  cartIds: number[] = [];

  constructor(private translateService: TranslateService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.translationSub = this.translateService.get('certificateDefaultText').subscribe((text) => {
      this.customTextControl.setValue(text);
    });
  }

  ngOnDestroy(): void {
    this.translationSub?.unsubscribe();
  }

  getDate(timeStamp: number): Date {
    return new Date(timeStamp);
  }

  getPriceFormatted(price: number): string {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  toggleCertificate(event: any, cartId: number): void {
    console.log(event);

    console.log('toggling to: ' + event.checked + ' for cartId: ' + cartId);
    if (event.checked) {
      this.cartIds.push(cartId);
    } else {
      this.cartIds = this.cartIds.filter((id) => id !== cartId);
    }
  }

  createCertificate() {
    console.log('create certificate clicked');
    
    this.store.dispatch(
      createCertificate({
        requestDto: { cartIds: this.cartIds, text: this.customTextControl.value },
      }),
    );
  }
}
