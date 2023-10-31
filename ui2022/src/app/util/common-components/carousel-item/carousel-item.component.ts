import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileTree } from '../../../store/profile.store';

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

  @Input()
  set item(item: ProfileTree) {
    this._item = item;
    console.log(item);
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
