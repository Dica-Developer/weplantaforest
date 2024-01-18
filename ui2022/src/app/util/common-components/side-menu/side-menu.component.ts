import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/auth.store';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  isAdminSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAdminSub = this.store.select('profileState').subscribe((state) => {
      this.isAdmin = state.isAdmin;
    });
  }

  ngOnInit(): void {}

  routeToProfile() {
    this.router.navigate(['/user/' + localStorage.getItem('username')]);
  }

  logoutClicked() {
    this.store.dispatch(logout());
  }

  openMenu() {}

  ngOnDestroy() {
    this.isAdminSub?.unsubscribe();
  }
}
