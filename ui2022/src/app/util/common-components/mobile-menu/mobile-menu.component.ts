import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FacebookIconComponent } from '../icons/facebook-icon/facebook-icon.component';
import { YoutubeIconComponent } from '../icons/youtube-icon/youtube-icon.component';
import { InstagramIconComponent } from '../icons/instagram-icon/instagram-icon.component';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PlatformHelper } from '../../helper/platform.helper';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: true,
    imports: [
        MatIcon,
        NgIf,
        ButtonComponent,
        RouterLink,
        InstagramIconComponent,
        YoutubeIconComponent,
        FacebookIconComponent,
        TranslateModule,
    ],
})
export class MobileMenuComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Output() menuClosed = new EventEmitter();
  @Output() clickedSearchEmitter = new EventEmitter();
  @Output() clickedLogin = new EventEmitter();
  @Output() clickedLogout = new EventEmitter();
  constructor(private router: Router, private platformHelper: PlatformHelper) {}

  ngOnInit(): void {}

  loginClicked() {
    this.clickedLogin.emit();
  }

  logoutClicked() {
    this.clickedLogout.emit();
  }

  closeMenu() {
    this.menuClosed.emit();
  }

  routeToProfile() {
    this.router.navigate(['/user/' + this.platformHelper.getLocalstorage('username')]);
  }

  searchClicked() {
    this.clickedSearchEmitter.emit();
  }
}
