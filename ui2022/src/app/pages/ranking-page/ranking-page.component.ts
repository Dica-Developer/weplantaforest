import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  loadRankings,
  RankingType,
  selectRankingMaxAmount,
  selectRankings,
} from '../../store/ranking.store';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
  providers: [TitleCasePipe],
})
export class RankingPageComponent implements OnInit {
  rankings$ = this.store.select(selectRankings);
  maxValue$ = this.store.select(selectRankingMaxAmount);
  type: RankingType = 'bestUser';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadRankings('bestUser');
  }

  loadRankings(rankingType: RankingType) {
    this.type = rankingType;
    this.store.dispatch(loadRankings({ rankingType, pageSize: 100, lastYear: false }));
  }
}
