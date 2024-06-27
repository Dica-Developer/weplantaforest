import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getTeamTrees, selectTeamDetails, selectTeamTrees } from '../../../../store/team.store';
import { AppState, PagedData } from '../../../../store/app.state';
import { TranslateModule } from '@ngx-translate/core';
import { TeamTreeCarouselItemComponent } from '../team-tree-carousel-item/team-tree-carousel-item.component';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-team-trees',
    templateUrl: './team-trees.component.html',
    styleUrls: ['./team-trees.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatIcon,
        NgFor,
        TeamTreeCarouselItemComponent,
        AsyncPipe,
        TranslateModule,
    ],
})
export class TeamTreesComponent implements OnInit, OnDestroy {
  teamTrees$: Observable<PagedData<any>> = this.store.select(selectTeamTrees);
  teamDetailsSub: Subscription;

  currenPage: number = 0;
  teamName: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.teamDetailsSub = this.store.select(selectTeamDetails).subscribe((teamDetails) => {
      if (teamDetails) {
        this.teamName = teamDetails.teamName;
      }
    });
  }

  ngOnDestroy(): void {
    this.teamDetailsSub?.unsubscribe();
  }

  previousPage() {
    this.currenPage--;
    this.store.dispatch(getTeamTrees({ teamName: this.teamName, page: this.currenPage }));
  }

  nextPage() {
    this.currenPage++;
    this.store.dispatch(getTeamTrees({ teamName: this.teamName, page: this.currenPage }));
  }
}
