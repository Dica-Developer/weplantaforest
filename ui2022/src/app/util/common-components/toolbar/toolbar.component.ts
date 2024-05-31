import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { logout } from '../../../store/auth.store';
import { environment } from '../../../../environments/environment';
import { Subscription, skip } from 'rxjs';
import { selectPlantbagPriceFormatted } from '../../../store/plantbag.store';
import { SearchOverlayComponent } from '../search-overlay/search-overlay.component';
import { resetTree } from 'src/app/store/treeType.store';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { ButtonComponent } from '../button/button.component';
import { MatBadge } from '@angular/material/badge';
import { NgClass, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { BarrelIconComponent } from '../icons/barrel-icon/barrel-icon.component';
import { MatIcon } from '@angular/material/icon';
import { LogoIconComponent } from '../icons/logo-icon/logo-icon.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbar,
        LogoIconComponent,
        RouterLink,
        RouterLinkActive,
        MatIcon,
        BarrelIconComponent,
        NgClass,
        MatBadge,
        NgIf,
        ButtonComponent,
        SideMenuComponent,
        SearchOverlayComponent,
        MobileMenuComponent,
        AsyncPipe,
        CurrencyPipe,
        TranslateModule,
    ],
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
  showScaleClass = false;
  plantBagPriceSub: Subscription;
  @ViewChild('searchOverlay') searchOverlay: SearchOverlayComponent;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authenticationSub = this.store.select('authState').subscribe((state) => {
      this.loggedIn = state.isAuthenticated;
    });
    this.plantBagPriceSub = this.store
      .select(selectPlantbagPriceFormatted)
      // pipe skip to prevent the wheelbarrow animation from running on reload of page
      .pipe(skip(1))
      .subscribe((res) => {
        if (res !== '0.00€') {
          //scale plantbag icon if value changes
          this.showScaleClass = true;
          // remove after 2,2 secs to show sclaing again if value changes
          setTimeout(() => {
            this.showScaleClass = false;
          }, 2200);
        } else {
          this.showScaleClass = false;
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

  toggleTreeOverlay() {
    this.treeInfo = !this.treeInfo;
  }

  closeSearch() {
    if (this.overlayIsOpen) {
      this.overlayIsOpen = false;
    }
  }

  closeMenu() {
    if (this.menuOpened) {
      this.menuOpened = false;
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
    this.searchOverlay.focusSearch();
  }

  resetTree() {
    this.store.dispatch(resetTree());
  }

  ngOnDestroy() {
    this.authenticationSub?.unsubscribe();
    this.plantBagPriceSub?.unsubscribe();
  }
}
