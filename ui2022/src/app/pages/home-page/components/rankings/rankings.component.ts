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

  constructor(
    private platformHelper: PlatformHelper,
    private store: Store<AppState>) {
    this.store.dispatch(loadRankings({ rankingType: 'bestUser', pageSize: 5, lastYear: true }))
  }

  ngOnInit(): void {
    this.platformHelper.scrollTop()
  }

}
