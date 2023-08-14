import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-header',
  templateUrl: './team-header.component.html',
  styleUrls: ['./team-header.component.scss'],
})
export class TeamHeaderComponent implements OnInit {
  @Input() teamDetails;
  @Input() showEdit;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToTeam() {
    console.log('routing to team');
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

  editTeam() {}
}
