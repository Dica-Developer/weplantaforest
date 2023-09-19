import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  loadActiveProjectReports,
  loadInActiveProjectReports,
  selectActiveProjectReports,
  selectAmountOfInactiveProjects,
  selectInActiveProjectReports,
} from 'src/app/store/project-report.store';

@Component({
  selector: 'app-project-reports-overview-page',
  templateUrl: './project-reports-overview-page.component.html',
  styleUrls: ['./project-reports-overview-page.component.scss'],
})
export class ProjectReportsOverviewPageComponent implements OnInit, OnDestroy {
  type: string = 'active';
  activeProjectReports$ = this.store.select(selectActiveProjectReports);
  inactiveProjectReports$ = this.store.select(selectInActiveProjectReports);

  amountOfInactiveProjects: number;
  inactiveAmountOfProjectsSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadInActiveProjectReports({ pageSize: 8 }));
    this.store.dispatch(loadActiveProjectReports());
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.inactiveAmountOfProjectsSub = this.store
      .select(selectAmountOfInactiveProjects)
      .subscribe((res) => {
        this.amountOfInactiveProjects = res;
      });
  }

  setType(event: any) {
    this.type = event;
  }

  loadAllInactiveProjects() {
    this.store.dispatch(loadInActiveProjectReports({ pageSize: this.amountOfInactiveProjects }));
  }

  ngOnDestroy(): void {
    this.inactiveAmountOfProjectsSub?.unsubscribe();
  }
}
