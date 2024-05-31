import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/auth.store';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    standalone: true,
    imports: [
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        NgIf,
        RouterLink,
        TranslateModule,
    ],
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
