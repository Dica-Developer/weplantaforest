import { Component, Input, OnInit } from '@angular/core';
import { RankingType, TreeRankedUserData } from '../../../../store/ranking.store';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-item',
  templateUrl: './ranking-item.component.html',
  styleUrls: ['./ranking-item.component.scss'],
})
export class RankingItemComponent implements OnInit {
  @Input()
  item: TreeRankedUserData;

  @Input()
  max: number;

  @Input()
  lastYear: boolean = true;

  @Input()
  type: RankingType;

  imageUrl: string = '';
  percentOfMax: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.type === 'bestTeam') {
      if (this.item.imageName && this.item.imageName != 'default') {
        this.imageUrl =
          environment.backendUrl +
          '/team/image/' +
          encodeURIComponent(this.item.imageName) +
          '/60/60';
      } else {
        this.imageUrl = 'assets/ipat_logo.jpg';
      }
    } else {
      if (this.item.imageName && this.item.imageName != 'default') {
        this.imageUrl =
          environment.backendUrl +
          '/user/image/' +
          encodeURIComponent(this.item.imageName) +
          '/60/60';
      } else {
        this.imageUrl = 'assets/default_user.jpg';
      }
    }
    this.percentOfMax = (this.item.amount / this.max) * 100;
  }

  route() {
    if (this.type === 'bestTeam') {
      this.router.navigate(['/team/' + encodeURIComponent(this.item.name)]);
    } else {
      this.router.navigate(['/profile/' + encodeURIComponent(this.item.name)]);
    }
  }
}
