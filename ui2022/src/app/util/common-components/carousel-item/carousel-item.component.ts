import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() rankingItem: RankingItem;

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
