import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
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
