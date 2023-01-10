import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadProjectReport, selectProjectReport } from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  projectReport$ = this.store.select(selectProjectReport);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProjectReport({ projectName: paramMap.get('projectName') }));
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
