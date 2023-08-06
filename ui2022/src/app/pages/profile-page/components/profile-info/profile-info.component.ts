import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  @Input() profileDetails;
  @Input() teamDetails;
  @Input() showEdit;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editProfile() {
    let username = localStorage.getItem('username');
    this.router.navigate(['/editProfile/' + username]);
  }

  routeToTeam() {
    console.log('routing to team');
    
    this.router.navigate(['/team/' + this.teamDetails.teamName]);
  }

}
