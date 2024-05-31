import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileTree } from '../../../store/profile.store';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, DatePipe } from '@angular/common';

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
    standalone: true,
    imports: [
        NgIf,
        DatePipe,
        TranslateModule,
    ],
})
export class CarouselItemComponent implements OnInit {
  _item: ProfileTree;

  @Input()
  set item(item: ProfileTree) {
    this._item = item;
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
