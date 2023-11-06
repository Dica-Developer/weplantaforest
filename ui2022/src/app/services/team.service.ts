import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export declare type TeamField = 'name' | 'description';

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
    return this.http.get<boolean>(environment.backendUrl + '/team/isAdmin?teamId=' + teamId);
  }

  isTeamMember(teamId: number) {
    return this.http.get<boolean>(environment.backendUrl + '/team/isMember?teamId=' + teamId);
  }

  loadTeamMembers(teamName: string, page: number) {
    return this.http.get(
      environment.backendUrl +
        '/team/member?teamName=' +
        encodeURIComponent(teamName) +
        '&page=' +
        page +
        '&size=8',
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

  leaveTeam() {
    return this.http.post(environment.backendUrl + '/team/leave', {});
  }

  joinTeam(id: number) {
    return this.http.post(environment.backendUrl + '/team/join?teamId=' + id, {});
  }

  updateTeam(id: number, toEdit: TeamField, newEntry: string) {
    return this.http.post(
      environment.backendUrl +
        '/team/edit?teamId=' +
        id +
        '&toEdit=' +
        toEdit +
        '&newEntry=' +
        newEntry,
      {},
    );
  }

  getTrees(teamName: string, page: number) {
    return this.http.get(
      environment.backendUrl +
        '/trees/team?teamName=' +
        encodeURIComponent(teamName) +
        '&page=' +
        page +
        '&size=8',
    );
  }

  updateTeamImage(teamId: number, image: any) {
    const formData = new FormData();
    formData.append('teamId', teamId + '');
    formData.append('file', image);
    return this.http.post(environment.backendUrl + '/team/image/upload', formData, {
      responseType: 'text',
    });
  }
}
