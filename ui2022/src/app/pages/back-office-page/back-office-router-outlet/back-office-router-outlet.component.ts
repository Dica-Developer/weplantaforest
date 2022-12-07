import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { selectUsername, selectProfileImagename } from '../../../store/profile.store';
import { environment } from '../../../../environments/environment';
import { logout } from '../../../store/auth.store';

@Component({
  selector: 'app-back-office-router-outlet',
  templateUrl: './back-office-router-outlet.component.html',
  styleUrls: ['./back-office-router-outlet.component.scss'],
})
export class BackOfficeRouterOutletComponent implements OnInit {
  username$: Observable<string>;
  profileImgUrl: string;

  profileImagenameSub = this.store.select(selectProfileImagename).subscribe((imageName) => {
    if (imageName && imageName != 'default' && imageName != '') {
      this.profileImgUrl =
        environment.backendUrl + '/user/image/' + imageName + '/' + 50 + '/' + 50;
    } else {
      this.profileImgUrl = '/assets/default_user.jpg';
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
    this.store.dispatch(logout());
  }
}
