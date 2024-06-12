import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { environment } from '../../../../../environments/environment';
import { selectUserLanguage } from '../../../../store/profile.store';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-profile-widgets',
  templateUrl: './profile-widgets.component.html',
  styleUrls: ['./profile-widgets.component.scss'],
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    TranslateModule,
  ],
})
export class ProfileWidgetsComponent implements OnInit {
  userLanuage: string;
  userLanuguageSub: Subscription;

  widget100x100Url: string = '';
  widget300x100Url: string = '';
  widget100x300Url: string = '';

  widget100x100Code: string =
  '<a href="' +
    environment.backendUrl +
    '/user/' +
    this.platformHelper.getLocalstorage('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    this.platformHelper.getLocalstorage('username') +
    '&width=200&height=200&language=DEUTSCH" /></a>';

  widget300x100Code: string =
  '<a href="' +
    environment.backendUrl +
    '/user/' +
    this.platformHelper.getLocalstorage('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    this.platformHelper.getLocalstorage('username') +
    '&width=600&height=200&language=DEUTSCH" /></a>';

  widget100x300Code: string =
  '<a href="' +
    environment.backendUrl +
    '/user/' +
    this.platformHelper.getLocalstorage('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    this.platformHelper.getLocalstorage('username') +
    '&width=200&height=600&language=DEUTSCH" /></a>';

  constructor(private store: Store<AppState>, private platformHelper: PlatformHelper) {}

  ngOnInit(): void {
    this.userLanuguageSub = this.store.select(selectUserLanguage).subscribe((userLanguage) => {
      if (userLanguage === 'en') {
        this.userLanuage = 'ENGLISH';
      } else {
        this.userLanuage = 'DEUTSCH';
      }
      this.createWidgetUrls();
    });
  }

  createWidgetUrls() {
    this.widget100x100Url =
      environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=200&height=200&language=' +
        this.userLanuage;
    this.widget300x100Url =
      environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=600&height=200&language=' +
        this.userLanuage;
    this.widget100x300Url =
      environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=200&height=600&language=' +
        this.userLanuage;

    this.widget100x100Code =
      '<a href="' +
        environment.frontendUrl +
        '/user/' +
        this.platformHelper.getLocalstorage('username') +
        '"><img src="' +
        environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=200&height=200&language=' +
        this.userLanuage +
        '" /></a>';

    this.widget300x100Code =
      '<a href="' +
        environment.frontendUrl +
        '/user/' +
        this.platformHelper.getLocalstorage('username') +
        '"><img src="' +
        environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=600&height=200&language=' +
        this.userLanuage +
        '" /></a>';

    this.widget100x300Code =
      '<a href="' +
        environment.frontendUrl +
        '/user/' +
        this.platformHelper.getLocalstorage('username') +
        '"><img src="' +
        environment.backendUrl +
        '/widget_2022?userName=' +
        this.platformHelper.getLocalstorage('username') +
        '&width=200&height=600&language=' +
        this.userLanuage +
        '" /></a>';
  }
}
