import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  loadUserDetails(username: string) {
    return this.http.get(environment.backendUrl + '/user?userName=' + username);
  }

  isAdmin() {
    return this.http.get(environment.backendUrl + '/isAdmin');
  }
}
