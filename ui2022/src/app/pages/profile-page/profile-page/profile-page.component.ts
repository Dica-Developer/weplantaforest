import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loadProfileDetails, selectProfileDetails } from '../../../store/profile.store';
import { selectTeamDetails } from '../../../store/team.store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, AfterViewInit, OnDestroy {
  profileDetails$ = this.store.select(selectProfileDetails);
  teamDetails$ = this.store.select(selectTeamDetails);
  showEdit: boolean = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.store.dispatch(loadProfileDetails({ username: paramMap.get('username') }));
      if (paramMap.get('username') === localStorage.getItem('username')) {
        this.showEdit = true;
      } else {
        this.showEdit = false;
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
