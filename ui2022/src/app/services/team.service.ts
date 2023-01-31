import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  loadTeams() {
    return this.http.get(environment.backendAdminUrl + '/teams');
  }

  loadTeamDetails(teamName: string) {
    return this.http.get(environment.backendUrl + '/team?teamName=' + encodeURIComponent(teamName));
  }
}
