import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() profileDetails;
  @Input() showEdit;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  editProfile() {
    let username = localStorage.getItem('username');
    this.router.navigate(['/editProfile/' + username]);
  }
}
