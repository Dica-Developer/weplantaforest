import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-profile-widgets',
  templateUrl: './profile-widgets.component.html',
  styleUrls: ['./profile-widgets.component.scss'],
})
export class ProfileWidgetsComponent implements OnInit {
  widget100x100Url: string =
    environment.backendUrl + '/widget_2022?userName=Gabor&width=200&height=200&language=DEUTSCH';
  widget300x100Url: string =
    environment.backendUrl + '/widget_2022?userName=Gabor&width=600&height=200&language=DEUTSCH';
  widget100x300Url: string =
    environment.backendUrl + '/widget_2022?userName=Gabor&width=200&height=600&language=DEUTSCH';

  widget100x100Code: string =
    '<a href="' +
    environment.backendUrl +
    '/user/' +
    localStorage.getItem('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    localStorage.getItem('username') +
    '&width=200&height=200&language=DEUTSCH" /></a>';

  widget300x100Code: string =
    '<a href="' +
    environment.backendUrl +
    '/user/' +
    localStorage.getItem('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    localStorage.getItem('username') +
    '&width=600&height=200&language=DEUTSCH" /></a>';

  widget100x300Code: string =
    '<a href="' +
    environment.backendUrl +
    '/user/' +
    localStorage.getItem('username') +
    '"><img src="' +
    environment.backendUrl +
    '/widget_2022?userName=' +
    localStorage.getItem('username') +
    '&width=200&height=600&language=DEUTSCH" /></a>';

  constructor() {}

  ngOnInit(): void {}
}
