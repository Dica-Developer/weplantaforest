import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  @Input() teamDetails;

  constructor() {}

  ngOnInit(): void {}
}
