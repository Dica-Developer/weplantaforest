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

  isTeamAdmin(teamId: number) {
    return this.http.get(environment.backendUrl + '/team/isAdmin?teamId=' + teamId);
  }

  isTeamMember(teamId: number) {
    return this.http.get(environment.backendUrl + '/team/isMember?teamId=' + teamId);
  }

  loadTeamMembers(teamName: string, page: number) {
    return this.http.get(
      environment.backendUrl +
        '/team/member?teamName=' +
        encodeURIComponent(teamName) +
        '&page=' +
        page +
        '&size=4',
    );
  }

  createTeam(name: string, description: string) {
    return this.http.post(
      environment.backendUrl + '/team/create',
      {
        name: name,
        description: description,
      },
      { responseType: 'text' },
    );
  }

  deleteTeam(id: number) {
    return this.http.delete(environment.backendUrl + '/team/delete?teamId=' + id);
  }
}
