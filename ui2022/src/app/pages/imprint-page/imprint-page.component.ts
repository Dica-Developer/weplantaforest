import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectUserLanguage } from '../../store/profile.store';

@Component({
  selector: 'app-imprint-page',
  templateUrl: './imprint-page.component.html',
  styleUrls: ['./imprint-page.component.scss'],
})
export class ImprintPageComponent implements OnInit, OnDestroy {
  imprints;

  imprintSub: Subscription;
  languageSub: Subscription;

  constructor(private store: Store<AppState>, private contentService: ContentService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.languageSub = this.store.select(selectUserLanguage).subscribe((language) => {
      this.imprintSub?.unsubscribe();
      let lng = '';
      if (language === 'ENGLISH' || language === 'en') {
        lng = 'ENGLISH';
      } else if (language === 'DEUTSCH' || language === 'de') {
        lng = 'DEUTSCH';
      }
      this.imprintSub = this.contentService
        .getInfrastructureArticle('IMPRESS', lng)
        .subscribe((res) => {
          this.imprints = res;
        });
    });
  }

  ngOnDestroy(): void {
    this.imprintSub?.unsubscribe();
    this.languageSub?.unsubscribe();
  }
}
