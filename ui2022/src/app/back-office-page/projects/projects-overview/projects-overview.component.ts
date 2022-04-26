import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import {
  ProjectManager,
  resetProjectDetails,
} from '../../../store/project.store';
import {
  profileFeature,
  selectProfileDetails,
} from '../../../store/profile.store';
import {
  loadProjectDetailsSuccess,
  ProjectDetails,
} from '../../../store/project.store';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit {
  manager: ProjectManager;
  constructor(private store: Store<AppState>) {
    store.select(selectProfileDetails).subscribe((res) => {
      this.manager = {
        id: res.id,
        name: res.userName,
      };
    });
  }

  ngOnInit(): void {}

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
