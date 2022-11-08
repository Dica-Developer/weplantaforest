import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(name: string, password: string) {
    return this.http.post(
      environment.backendUrl + '/api/login',
      { name, password },
      { observe: 'response' }
    );
  }

  resetPasswordRequest(email: string, language: string) {
    return this.http.post(
      environment.backendUrl +
        '/password_request?userName=' +
        email +
        '&language=' +
        language,
      {}
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
      { responseType: 'text' }
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
      { responseType: 'text' }
    );
  }
}
