import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { selectLoggedIn, selectJwtToken } from './store/auth.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  token$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.loggedIn$ = store.select(selectLoggedIn);
    this.token$ = store.select(selectJwtToken);
    this.loggedIn$.subscribe((res) => {
      if (res) {
        this.router.navigate(['/backOffice2022']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
