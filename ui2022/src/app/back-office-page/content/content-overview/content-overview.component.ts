import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import {
  selectContentArticleDetails,
  ContentArticleDetails,
} from '../../../store/content.store';
import { Subscription } from 'rxjs';
import { selectUsername } from '../../../store/profile.store';
import { loadArticleDetailsSuccess } from '../../../store/content.store';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss'],
})
export class ContentOverviewComponent implements OnInit, OnDestroy {
  contentDetails: ContentArticleDetails;

  contentDetailsSub: Subscription;

  loggedInUsername: string;
  loggedInUserNameSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.contentDetailsSub = store
      .select(selectContentArticleDetails)
      .subscribe((res) => {
        this.contentDetails = res;
      });
    this.loggedInUserNameSub = store.select(selectUsername).subscribe((res) => {
      this.loggedInUsername = res;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.contentDetailsSub.unsubscribe();
    this.loggedInUserNameSub.unsubscribe();
  }

  createArticle() {
    const details: ContentArticleDetails = {
      id: null,
      articleType: null,
      createdOn: new Date().getTime(),
      imageDescription: null,
      imageFileName: null,
      intro: '',
      lang: null,
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
