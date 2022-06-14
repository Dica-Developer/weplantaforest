import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Observable } from 'rxjs';
import { selectUsername, selectProfileImagename } from '../store/profile.store';
import { environment } from '../../environments/environment';
import { logout } from "../store/auth.store";

declare type BackofficePage = 'CARTS' | 'USER' | 'PROJECTS' | 'CONTENT' | 'EVENTS' | 'TREETYPES' | 'PLANT_FOR_USER';

@Component({
  selector: 'app-back-office-page',
  templateUrl: './back-office-page.component.html',
  styleUrls: ['./back-office-page.component.scss'],
})
export class BackOfficePageComponent implements OnInit, OnDestroy {

  username$: Observable<string>;
  profileImgUrl: string;
  selectedOverview: BackofficePage = 'CARTS';

  profileImagenameSub = this.store.select(selectProfileImagename).subscribe(imageName => {
    if(imageName && imageName != 'default' && imageName != '') {
      this.profileImgUrl = environment.backendUrl + '/user/image/' + imageName + '/' + 50 + '/' + 50;
    }else {
      this.profileImgUrl = '/assets/default_user.jpg'
    }
  });
  
  constructor(private store: Store<AppState>) {
    this.username$ = store.select(selectUsername);
    
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.profileImagenameSub.unsubscribe();
  }

  logout() {
    this.store.dispatch(logout())
  }

  selectOverviewPage(page: BackofficePage) {
    this.selectedOverview = page;
  }
}
