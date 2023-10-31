import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileTree } from '../../../store/profile.store';
import { environment } from 'src/environments/environment';

export interface RankingItem {
  imageUrl: string;
  name: string;
  amount: number;
  linkTo: string;
}

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent implements OnInit {
  _item: ProfileTree;
  imageUrl: string;

  @Input()
  set item(item: ProfileTree) {
    this._item = item;
    if (item['treeTypeImageName']) {
      this.imageUrl = `${environment.backendUrl}/treeType/image/${encodeURIComponent(
        item['treeTypeImageName'],
      )}/60/60`;
    } else if (item['imageName']) {
      this.imageUrl = `${environment.backendUrl}/user/image/${encodeURIComponent(
        item['imageName'],
      )}/60/60`;
    } else {
      this.imageUrl = 'assets/default_user.jpg';
    }
  }

  @Input()
  linkTo: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  route() {
    if (this.linkTo) {
      this.router.navigate([this.linkTo]);
    }
  }
}
