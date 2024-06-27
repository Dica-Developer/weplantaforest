import { TitleCasePipe, NgClass, NgFor, NgIf, AsyncPipe } from '@angular/common';
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
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { RankingItemComponent } from './components/ranking-item/ranking-item.component';
import { RouterLink } from '@angular/router';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
  providers: [TitleCasePipe],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgFor,
    RankingItemComponent,
    NgIf,
    MatIcon,
    AsyncPipe,
    TitleCasePipe,
    TranslateModule,
  ],
})
export class RankingPageComponent implements OnInit, OnDestroy {
  rankings$ = this.store.select(selectRankings);
  maxValue$ = this.store.select(selectRankingMaxAmount);
  type: RankingType = 'bestUser';

  totalNumberOfElementsSub: Subscription;
  totalNumberOfElements: number;

  lastYear: boolean = true;

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.platformHelper.scrollTop()
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
        lastYear: this.lastYear,
      }),
    );
  }

  timeSpanChanged(lastYear: boolean) {
    this.lastYear = lastYear;
    this.store.dispatch(
      loadRankings({ rankingType: this.type, pageSize: 100, lastYear: this.lastYear }),
    );
  }
}
