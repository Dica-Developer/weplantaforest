import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { selectAuthenticated } from "../../store/auth.store";

@Component({
  selector: 'app-gift-redeem-page',
  templateUrl: './gift-redeem-page.component.html',
  styleUrls: ['./gift-redeem-page.component.scss']
})
export class GiftRedeemPageComponent implements OnInit {

  loggedIn$ = this.store.select(selectAuthenticated)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
