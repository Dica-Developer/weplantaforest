import { Component, OnInit } from '@angular/core';
import { ProjectDetails, selectProjectDetails, selectProjectDetailsLoading } from '../../../store/project.store';
import { Store } from '@ngrx/store';
import { AppState } from "src/app/store/app.state";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  details: ProjectDetails;

  detailsLoading$: Observable<Boolean>

  constructor(private store: Store<AppState>) { 
    store.select(selectProjectDetails).subscribe(details => {
      this.details = details;
    })

    this.detailsLoading$ = store.select(selectProjectDetailsLoading);
  }

  ngOnInit(): void {
  }

}
