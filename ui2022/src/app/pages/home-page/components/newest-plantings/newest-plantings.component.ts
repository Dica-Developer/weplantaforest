import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProjectCarouselItemComponent } from 'src/app/pages/project-page/components/project-carousel-item/project-carousel-item.component';
import { RankingService } from 'src/app/services/ranking.service';
import { AppState } from 'src/app/store/app.state';
import { loadNewestTrees, selectNewestPlantings} from 'src/app/store/ranking.store';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

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
  plantingsSub: Subscription;
  plantings$ = this.store.select(selectNewestPlantings);
  plantings: any;

  constructor(private platformHelper: PlatformHelper, private store: Store<AppState>, private rankingService: RankingService) {
    if (this.platformHelper.isBrowser) {
      this.store.dispatch(loadNewestTrees());
    }
  }

  ngOnInit() {
    this.plantingsSub = this.plantings$.subscribe(res => {
      this.plantings = res;
    })
  }

  ngOnDestroy() {
    this.plantingsSub?.unsubscribe()
  }

}
