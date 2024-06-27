import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-team-info',
    templateUrl: './team-info.component.html',
    styleUrls: ['./team-info.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        TranslateModule,
    ],
})
export class TeamInfoComponent implements OnInit {
  _teamDetails: any;

  @Input()
  set teamDetails(details) {
    this._teamDetails = details;
  }

  teamImageUrl: string = "";

  constructor() {}

  ngOnInit(): void {}

}
