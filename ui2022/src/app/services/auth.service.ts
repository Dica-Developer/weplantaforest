import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth.store';
import { loadAdminFlag, loadProfileDetails, setUsername } from '../store/profile.store';
import { loadTreeTypes } from '../store/treeType.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(name: string, password: string) {
    return this.http.post(
      environment.backendUrl + '/api/login',
      { name, password },
      { observe: 'response' },
    );
  }

  signup(
    username: string,
    password: string,
    mail: string,
    newsletter: boolean,
    orgType: string,
    language: string,
  ) {
    return this.http.post(
      environment.backendUrl + '/user/registrate',
      { username, password, mail, newsletter, orgType, language },
      { observe: 'response' },
    );
  }

  resetPasswordRequest(email: string, language: string) {
    return this.http.post(
      environment.backendUrl + '/password_request?userName=' + email + '&language=' + language,
      {},
    );
  }

  resetPassword(id: number, password: string, key: string, language: string) {
    return this.http.post(
      environment.backendUrl +
        '/password_reset?id=' +
        id +
        '&password=' +
        password +
        '&key=' +
        key +
        '&language=' +
        language,
      {},
      { responseType: 'text' },
    );
  }

  verifyRegistration(id: number, key: string, language: string) {
    return this.http.post(
      environment.backendUrl +
        '/user/activation' +
        '?id=' +
        id +
        '&key=' +
        key +
        '&language=' +
        language,
      { responseType: 'text' },
    );
  }

  verifyPasswordResetLink(id: number, key: string, language: string) {
    return this.http.post(
      environment.backendUrl +
        '/password_reset_verify?id=' +
        id +
        '&key=' +
        key +
        '&language=' +
        language,
      {},
      { responseType: 'text' },
    );
  }

  autoLogin() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    } else {
      this.store.dispatch(loginSuccess());
      this.store.dispatch(loadAdminFlag());
      this.store.dispatch(setUsername({ username: localStorage.getItem('username') }));
      this.store.dispatch(loadAdminFlag());
      this.store.dispatch(
        loadProfileDetails({
          userId: +localStorage.getItem('userId'),
        }),
      );
      this.store.dispatch(loadTreeTypes());
    }
  }
}
