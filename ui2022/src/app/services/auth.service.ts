import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
