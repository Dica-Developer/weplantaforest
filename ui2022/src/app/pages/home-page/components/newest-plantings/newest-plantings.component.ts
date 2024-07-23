import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectCarouselItemComponent } from 'src/app/pages/project-page/components/project-carousel-item/project-carousel-item.component';
import { RankingService } from 'src/app/services/ranking.service';
import { AppState } from 'src/app/store/app.state';
import { loadNewestTrees, selectNewestPlantings} from 'src/app/store/ranking.store';

@Component({
  selector: 'app-newest-plantings',
  standalone: true,
  imports: [
    TranslateModule,
    ProjectCarouselItemComponent,
    AsyncPipe,
    NgIf,
    NgFor
  ],
  templateUrl: './newest-plantings.component.html',
  styleUrl: './newest-plantings.component.scss'
})
export class NewestPlantingsComponent {
  plantings$ = this.store.select(selectNewestPlantings);

  constructor(private store: Store<AppState>, private rankingService: RankingService) {
    this.store.dispatch(loadNewestTrees())
  }


}
