import { AsyncPipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RankingItemComponent } from 'src/app/pages/ranking-page/components/ranking-item/ranking-item.component';
import { AppState } from 'src/app/store/app.state';
import { RankingType, loadRankings, selectRankingMaxAmount, selectRankings, selectTotalNumber } from 'src/app/store/ranking.store';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    NgFor,
    TranslateModule,
    TitleCasePipe,
    AsyncPipe,
    MatIcon,
    RankingItemComponent
  ],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
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
    this.store.dispatch(loadRankings({ rankingType, pageSize: 5, lastYear: this.lastYear }));
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
}
