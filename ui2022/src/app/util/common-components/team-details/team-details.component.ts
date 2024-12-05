import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { TeamDetails } from 'src/app/store/team.store';

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.scss'],
    standalone: true,
    imports: [DatePipe, TranslateModule],
})
export class TeamDetailsComponent implements OnInit {
  @Input() teamDetails: TeamDetails;

  constructor() {}

  ngOnInit(): void {}
}
