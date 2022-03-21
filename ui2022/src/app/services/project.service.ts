import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  loadAll() {
    return this.http.get(environment.backendAdminUrl + '/projects');
  }

  loadDetails(id: number) {
    return this.http.get(environment.backendAdminUrl + '/project?projectId=' + id);
  }
}
