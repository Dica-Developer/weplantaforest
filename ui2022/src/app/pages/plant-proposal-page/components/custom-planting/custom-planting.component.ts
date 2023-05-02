import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectProjectsForCustomPlanting } from '../../../../store/plant.store';
import { selectProfileDetails } from '../../../../store/profile.store';
import { AppState } from '../../../../store/app.state';
import { TextHelper } from '../../../../util/text.helper';

@Component({
  selector: 'app-custom-planting',
  templateUrl: './custom-planting.component.html',
  styleUrls: ['./custom-planting.component.scss'],
})
export class CustomPlantingComponent implements OnInit, OnDestroy {
  activeProjects;
  activeProjectsSub: Subscription;
  profileDetailsSub: Subscription;
  profileDetails;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects;
        console.log(projects);
      });
    this.profileDetailsSub = this.store.select(selectProfileDetails).subscribe((details) => {
      this.profileDetails = details;
    });
  }

  ngOnDestroy(): void {
    this.activeProjectsSub?.unsubscribe();
    this.profileDetailsSub?.unsubscribe();
  }

  getTreeTypeNameByLanguage(text: string) {
    return this.textHelper.getTextForLanguage(text, this.profileDetails?.lang ?? 'de');
  }
}
