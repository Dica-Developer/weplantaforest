import { Component, Input, OnInit } from '@angular/core';
import { RankingType, TreeRankedUserData } from '../../../../store/ranking.store';
import { environment } from '../../../../../environments/environment';

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
  type: RankingType;

  imageUrl: string = '';
  percentOfMax: number = 0;

  constructor() {}

  ngOnInit(): void {
    if(this.type === 'bestTeam') {
      this.imageUrl =
        environment.backendUrl + '/team/image/' + encodeURIComponent(this.item.imageName) + '/60/60';

    }else {
      this.imageUrl =
        environment.backendUrl + '/user/image/' + encodeURIComponent(this.item.imageName) + '/60/60';
    }
    this.percentOfMax = this.item.amount / this.max * 100;
  }
}
