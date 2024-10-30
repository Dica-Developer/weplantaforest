import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { selectUsername, selectProfileImagename } from '../../store/profile.store';
import { environment } from '../../../environments/environment';
import { logout } from '../../store/auth.store';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { LogoIconComponent } from 'src/app/util/common-components/icons/logo-icon/logo-icon.component';

@Component({
  selector: 'app-back-office-router-outlet',
  templateUrl: './back-office-router-outlet.component.html',
  styleUrls: ['./back-office-router-outlet.component.scss'],
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AsyncPipe,
    LogoIconComponent,
  ],
})
export class BackOfficeRouterOutletComponent implements OnInit {
  username$: Observable<string>;
  profileImgUrl: string;

  profileImagenameSub = this.store.select(selectProfileImagename).subscribe((imageName) => {
    if (imageName && imageName != 'default' && imageName != '') {
      this.profileImgUrl =
        environment.backendUrl + '/user/image/' + imageName + '/' + 50 + '/' + 50;
    } else {
      this.profileImgUrl = environment.baseUrl +  '/assets/default_user.jpg';
    }
  });

  logoUrl = environment.baseUrl + '/assets/ipat_logo.png';

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
