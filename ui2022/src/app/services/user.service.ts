import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loadAllUser() {
    return this.http.get(environment.backendAdminUrl + '/users');
  }

  updateUsername(userId: number, userName: string) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/changeName?userId=' +
        userId +
        '&newUsername=' +
        userName,
      {}
    );
  }

  updateMail(userId: number, mail: string) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/changeMail?userId=' +
        userId +
        '&newMail=' +
        mail,
      {}
    );
  }

  updateActiveFlag(userId: number, value: boolean) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/changeActiveFlag?userId=' +
        userId +
        '&activeFlag=' +
        value,
      {}
    );
  }

  updateBannedFlag(userId: number, value: boolean) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/changeBannedFlag?userId=' +
        userId +
        '&bannedFlag=' +
        value,
      {}
    );
  }

  updateAdminRole(userId: number, value: boolean) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/editAdminRole?userId=' +
        userId +
        '&shouldBeAdmin=' +
        value,
      {}
    );
  }

  updateArticleManagerRole(userId: number, value: boolean) {
    return this.http.post(
      environment.backendAdminUrl +
        '/user/editArticleManagerRole?userId=' +
        userId +
        '&shouldBeArticleManager=' +
        value,
      {}
    );
  }
}
