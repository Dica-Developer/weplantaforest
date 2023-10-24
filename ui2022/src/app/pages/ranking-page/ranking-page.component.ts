import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Subscription } from 'rxjs';
import {
  loadRankings,
  RankingType,
  selectRankingMaxAmount,
  selectRankings,
  selectTotalNumber,
} from '../../store/ranking.store';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
  providers: [TitleCasePipe],
})
export class RankingPageComponent implements OnInit, OnDestroy {
  rankings$ = this.store.select(selectRankings);
  maxValue$ = this.store.select(selectRankingMaxAmount);
  type: RankingType = 'bestUser';

  totalNumberOfElementsSub: Subscription;
  totalNumberOfElements: number;

  lastYear: boolean = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadRankings('bestUser');

    this.totalNumberOfElementsSub = this.store
      .select(selectTotalNumber)
      .subscribe((totalNumber) => {
        this.totalNumberOfElements = totalNumber;
      });
  }

  ngOnDestroy(): void {
    this.totalNumberOfElementsSub?.unsubscribe();
  }

  loadRankings(rankingType: RankingType) {
    this.type = rankingType;
    this.store.dispatch(loadRankings({ rankingType, pageSize: 100, lastYear: this.lastYear }));
  }

  loadAll() {
    this.store.dispatch(
      loadRankings({
        rankingType: this.type,
        pageSize: this.totalNumberOfElements,
        lastYear: false,
      }),
    );
  }

  timeSpanChanged(event: any) {
    this.lastYear = event.value;
    this.store.dispatch(loadRankings({ rankingType: this.type, pageSize: 100, lastYear: this.lastYear }));
  }
}
