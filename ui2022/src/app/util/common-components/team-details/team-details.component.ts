import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.scss'],
    standalone: true,
    imports: [DatePipe, TranslateModule],
})
export class TeamDetailsComponent implements OnInit {
  @Input() teamDetails;

  constructor() {}

  ngOnInit(): void {}
}
