import { Component, Input, OnInit } from '@angular/core';
import { PagedData } from '../../../../store/app.state';
import { ProfileTree } from '../../../../store/profile.store';

@Component({
  selector: 'app-profile-trees',
  templateUrl: './profile-trees.component.html',
  styleUrls: ['./profile-trees.component.scss'],
})
export class ProfileTreesComponent implements OnInit {
  @Input()
  trees: PagedData<ProfileTree>;

  constructor() {}

  ngOnInit(): void {}
}
