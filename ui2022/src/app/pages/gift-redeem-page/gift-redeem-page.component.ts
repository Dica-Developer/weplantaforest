import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { selectAuthenticated } from "../../store/auth.store";
import { TranslateModule } from '@ngx-translate/core';
import { NotAuthenticatedWarningComponent } from '../../util/common-components/not-authenticated-warning/not-authenticated-warning.component';
import { ProfileRedeemGiftComponent } from '../profile-page/components/profile-redeem-gift/profile-redeem-gift.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-gift-redeem-page',
    templateUrl: './gift-redeem-page.component.html',
    styleUrls: ['./gift-redeem-page.component.scss'],
    standalone: true,
    imports: [NgIf, ProfileRedeemGiftComponent, NotAuthenticatedWarningComponent, AsyncPipe, TranslateModule]
})
export class GiftRedeemPageComponent implements OnInit {

  loggedIn$ = this.store.select(selectAuthenticated)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
