import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadTeamDetails, selectTeamDetails } from 'src/app/store/team.store';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  teamDetails$ = this.store.select(selectTeamDetails);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadTeamDetails({ teamName: paramMap.get('teamname') }));
    });
  }

  ngOnInit(): void {
    this.teamDetails$.subscribe((res) => {
      console.log(res);
    });
  }

  ngOnChanges() {
    this.teamDetails$.subscribe((res) => {
      console.log(res);
    });
  }
}