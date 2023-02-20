import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { logout } from '../../../store/auth.store';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  logoUrl = environment.baseUrl + '/assets/ipatlogo_black.svg';
  barrelUrl = environment.baseUrl + '/assets/barrel_black.svg';
  menuOpened = false;
  treeInfo = false;
  overlayIsOpen = false;
  loggedIn = localStorage.getItem('jwt');

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {}

  loginClicked() {
    this.router.navigate(['/login']);
  }

  logoutClicked() {
    this.store.dispatch(logout());
    this.loggedIn = localStorage.getItem('jwt');
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
}
