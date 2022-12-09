import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectReportService {
  constructor(private http: HttpClient) {}

  loadAllProjectReports(page: number, size: number) {
    console.log('inside service');

    return this.http.get(
      environment.backendUrl + '/reports/allProjects' + '?page=' + page + '&size=' + size,
    );
  }
}
