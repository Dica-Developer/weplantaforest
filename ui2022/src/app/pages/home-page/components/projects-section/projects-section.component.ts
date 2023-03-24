import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  loadActiveProjectReports,
  selectActiveProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit {
  projectReports$ = this.store.select(selectActiveProjectReports);
  mapHeight: string = '900px';
  screenWidth;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadActiveProjectReports());
    this.getScreenSize();
  }

  @HostListener('window:load', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.screenWidth < 764) {
      this.mapHeight = '500px';
    }
  }
}
