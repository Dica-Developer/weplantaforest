import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import {
  selectContentArticleDetails,
  ContentArticleDetails,
} from '../../../../store/content.store';
import { Subscription } from 'rxjs';
import { loadArticleDetailsSuccess } from '../../../../store/content.store';
import { ContentDetailsComponent } from '../content-details/content-details.component';
import { ContentGridComponent } from '../content-grid/content-grid.component';
import { MatButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { PlatformHelper } from 'src/app/util/helper/platform.helper';

@Component({
    selector: 'app-content-overview',
    templateUrl: './content-overview.component.html',
    styleUrls: ['./content-overview.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        MatButton,
        ContentGridComponent,
        NgIf,
        ContentDetailsComponent,
    ],
})
export class ContentOverviewComponent implements OnInit, OnDestroy {
  contentDetails: ContentArticleDetails;

  contentDetailsSub: Subscription;

  loggedInUsername: string;

  constructor(private store: Store<AppState>, private platformHelper: PlatformHelper) {
    this.contentDetailsSub = store.select(selectContentArticleDetails).subscribe((res) => {
      this.contentDetails = res;
    });
    this.loggedInUsername = this.platformHelper.getLocalstorage('username');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.contentDetailsSub.unsubscribe();
  }

  createArticle() {
    const details: ContentArticleDetails = {
      id: null,
      articleType: 'Blog',
      createdOn: new Date().getTime(),
      imageDescription: null,
      imageFileName: null,
      intro: '',
      lang: 'DEUTSCH',
      paragraphs: [],
      showFull: true,
      title: '',
      visible: false,
      owner: {
        name: this.loggedInUsername,
      },
    };
    this.store.dispatch(loadArticleDetailsSuccess({ details }));
  }
}
