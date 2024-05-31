import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-not-authenticated-warning',
    templateUrl: './not-authenticated-warning.component.html',
    styleUrls: ['./not-authenticated-warning.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        TranslateModule,
    ],
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
