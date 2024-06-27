import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { selectProfileDetails } from '../../../../store/profile.store';
import { Subscription } from 'rxjs';
import { ProjectGridComponent } from '../project-grid/project-grid.component';
import { ProjectManager, resetProjectDetails } from '../../../../store/project.store';
import { loadProjectDetailsSuccess, ProjectDetails } from '../../../../store/project.store';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-projects-overview',
    templateUrl: './projects-overview.component.html',
    styleUrls: ['./projects-overview.component.scss'],
    standalone: true,
    imports: [
        MatButton,
        ProjectGridComponent,
        ProjectEditComponent,
    ],
})
export class ProjectsOverviewComponent implements OnInit, OnDestroy {
  manager: ProjectManager;

  selectProfileDetailsSub: Subscription;

  @ViewChild('projectgrid')
  grid: ProjectGridComponent;

  constructor(private store: Store<AppState>) {
    this.selectProfileDetailsSub = store.select(selectProfileDetails).subscribe((res) => {
      if (res) {
        this.manager = {
          id: res.id,
          name: res.userName,
        };
      }
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
    this.grid.resetSelectedRowIndex();
    setTimeout(() => {
      this.store.dispatch(loadProjectDetailsSuccess({ projectDetails }));
    }, 300);
  }
}
