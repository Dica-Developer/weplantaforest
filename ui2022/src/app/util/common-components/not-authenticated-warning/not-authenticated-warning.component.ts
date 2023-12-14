import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-authenticated-warning',
  templateUrl: './not-authenticated-warning.component.html',
  styleUrls: ['./not-authenticated-warning.component.scss'],
})
export class NotAuthenticatedWarningComponent implements OnInit {
  showGiftWarning: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (window.location.pathname.includes('/gift/redeem')) {
      this.showGiftWarning = true;
    }
  }
}
