import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { logout } from 'src/app/store/auth.store';
import { search } from 'src/app/store/search.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  logoUrl = environment.baseUrl + '/assets/ipatlogo_black.svg';
  barrelUrl = environment.baseUrl + '/assets/barrel_black.svg';
  menuOpened = false;
  overlayIsOpen = false;
  control: FormControl = new FormControl('');
  loggedIn = localStorage.getItem('jwt');

  valueCHangeSub: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.valueCHangeSub = this.control.valueChanges.subscribe((searchValue) => {
      if (searchValue && searchValue.length > 1) {
        this.store.dispatch(search({ searchValue }));
      }
    });
  }

  loginClicked() {
    this.router.navigate(['/login']);
  }

  logoutClicked() {
    this.store.dispatch(logout());
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  toggleSearch() {
    this.overlayIsOpen = !this.overlayIsOpen;
  }
}
