import { AsyncPipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { RankingItemComponent } from 'src/app/pages/ranking-page/components/ranking-item/ranking-item.component';
import { AppState } from 'src/app/store/app.state';
import { loadRankings, selectRankingMaxAmount, selectRankings } from 'src/app/store/ranking.store';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    NgFor,
    TranslateModule,
    RouterLink,
    MatTooltip,
    MatIcon,
    TitleCasePipe,
    AsyncPipe,
    RankingItemComponent
  ],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss'
})
export class RankingsComponent {
  rankings$ = this.store.select(selectRankings);
  maxValue$ = this.store.select(selectRankingMaxAmount);

  constructor(
    private store: Store<AppState>) {
    this.store.dispatch(loadRankings({ rankingType: 'bestUser', pageSize: 5, lastYear: true }))
  }

  ngOnInit(): void {
  }

}
