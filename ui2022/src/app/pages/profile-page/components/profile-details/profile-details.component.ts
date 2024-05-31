import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss'],
    standalone: true,
    imports: [DatePipe, TranslateModule],
})
export class ProfileDetailsComponent implements OnInit {
  @Input() profileDetails;

  constructor() {}

  ngOnInit(): void {}
}
