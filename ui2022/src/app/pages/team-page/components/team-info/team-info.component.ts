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
    this.teamImageUrl = this.createTeamImageUrl(details?.teamId, 75, 75);
  }

  teamImageUrl: string = "";

  constructor() {}

  ngOnInit(): void {}

  createTeamImageUrl(imageFileName: string, width: number, height: number): string {
    if (imageFileName && imageFileName != 'default') {
      return (
        'http://localhost:8081/team/image/' +
        encodeURIComponent(imageFileName) +
        '/' +
        width +
        '/' +
        height
      );
    } else {
      //TODO: add default team image
      return '/assets/images/default_user.jpg';
    }
  }
}
