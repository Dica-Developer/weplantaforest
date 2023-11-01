import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamMember } from 'src/app/store/team.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-carousel-item',
  templateUrl: './team-carousel-item.component.html',
  styleUrls: ['./team-carousel-item.component.scss'],
})
export class TeamCarouselItemComponent implements OnInit {
  _member: TeamMember;
  imageUrl: string;

  @Input()
  set member(member: TeamMember) {
    this._member = member;
    if (member.imageName) {
      this.imageUrl = `${environment.backendUrl}/user/image/${member.imageName}/60/60`;
    } else {
      this.imageUrl = 'assets/images/user.png';
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToProifile() {

    this.router.navigate(['/profile', this._member.name]);
  }
}
