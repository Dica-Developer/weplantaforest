import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { logout } from '../../../store/auth.store';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { selectPlantbagPriceFormatted } from '../../../store/plantbag.store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  logoUrl = environment.baseUrl + '/assets/ipatlogo_black.svg';
  barrelUrl = environment.baseUrl + '/assets/barrel_black.svg';
  authenticationSub: Subscription;
  menuOpened = false;
  treeInfo = false;
  overlayIsOpen = false;
  loggedIn: boolean;
  plantBagPrice$ = this.store.select(selectPlantbagPriceFormatted);

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authenticationSub = this.store.select('authState').subscribe((state) => {
      this.loggedIn = state.isAuthenticated;
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

  toggleTreeOverlay() {
    this.treeInfo = !this.treeInfo;
  }

  closeSearch() {
    if (this.overlayIsOpen) {
      this.overlayIsOpen = false;
    }
  }

  // listens for escape key when menu open
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.overlayIsOpen) {
      this.overlayIsOpen = false;
    }
  }

  toggleSearch() {
    if (!this.overlayIsOpen) {
      window.scroll(0, 0);
    }
    this.overlayIsOpen = !this.overlayIsOpen;
  }

  ngOnDestroy() {
    this.authenticationSub?.unsubscribe();
  }
}
