import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectContentArticleDetails } from '../../../store/content.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss'],
})
export class ContentOverviewComponent implements OnInit, OnDestroy {
  contentDetails;

  contentDetailsSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.contentDetailsSub = store
      .select(selectContentArticleDetails)
      .subscribe((res) => {
        this.contentDetails = res;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.contentDetailsSub.unsubscribe();
  }
}
