import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectContentArticleDetails } from '../../../store/content.store';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss'],
})
export class ContentOverviewComponent implements OnInit {
  contentDetails;

  constructor(private store: Store<AppState>) {
    store.select(selectContentArticleDetails).subscribe((res) => {
      this.contentDetails = res;
    });
  }

  ngOnInit(): void {}
}
