import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  getProjectsForCustomPlanting,
  selectProjectsForCustomPlanting,
} from '../../../../store/plant.store';
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
  collapsibleState: boolean = false;
  language$ = this.store.select(selectProfileDetails);

  @Input()
  projectId: number;

  constructor(private store: Store<AppState>, private textHelper: TextHelper) {}

  ngOnInit(): void {
    this.activeProjectsSub = this.store
      .select(selectProjectsForCustomPlanting)
      .subscribe((projects) => {
        this.activeProjects = projects;
        if (this.projectId) {
          this.activeProjects = projects.filter((project) => project.projectId === this.projectId);
        }
      });
    this.profileDetailsSub = this.store.select(selectProfileDetails).subscribe((details) => {
      this.profileDetails = details;
    });
    this.store.dispatch(getProjectsForCustomPlanting());
  }

  ngOnDestroy(): void {
    this.activeProjectsSub?.unsubscribe();
    this.profileDetailsSub?.unsubscribe();
  }

  getTreeTypeNameByLanguage(text: string) {
    this.language$.subscribe((lang) => {
      return this.textHelper.getTextForLanguage(text, this.profileDetails?.lang ?? lang);
    });
  }

  toggleCollapsibleState() {
    this.collapsibleState = !this.collapsibleState;
  }
}
