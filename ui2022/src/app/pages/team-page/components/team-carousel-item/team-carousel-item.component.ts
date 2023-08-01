import { Component, Input, OnInit } from '@angular/core';
import { TeamMember } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-carousel-item',
  templateUrl: './team-carousel-item.component.html',
  styleUrls: ['./team-carousel-item.component.scss'],
})
export class TeamCarouselItemComponent implements OnInit {
  @Input() member: TeamMember;

  constructor() {}

  ngOnInit(): void {}
}
