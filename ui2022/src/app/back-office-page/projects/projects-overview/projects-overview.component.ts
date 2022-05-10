import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectProfileDetails } from '../../../store/profile.store';
import { Subscription } from 'rxjs';
import {
  ProjectManager,
  resetProjectDetails,
} from '../../../store/project.store';
import {
  loadProjectDetailsSuccess,
  ProjectDetails,
} from '../../../store/project.store';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit, OnDestroy {
  manager: ProjectManager;

  selectProfileDetailsSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.selectProfileDetailsSub = store
      .select(selectProfileDetails)
      .subscribe((res) => {
        this.manager = {
          id: res.id,
          name: res.userName,
        };
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectProfileDetailsSub.unsubscribe();
  }

  createProject() {
    const projectDetails: ProjectDetails = {
      id: null,
      name: '',
      description: '',
      imageFileName: '',
      latitude: 0,
      longitude: 0,
      manager: this.manager,
      shopActive: false,
      visible: false,
      positions: [],
      articles: [],
      images: [],
    };
    this.store.dispatch(resetProjectDetails());
    setTimeout(() => {
      this.store.dispatch(loadProjectDetailsSuccess({ projectDetails }));
    }, 300);
  }
}
