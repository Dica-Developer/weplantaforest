import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactRequest } from '../store/contact.store';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getTreesPerYear() {
    return this.http.get(environment.backendUrl + '/statistic/treesPerYear');
  }

  getCo2() {
    return this.http.get(environment.backendUrl + '/statistic/co2');
  }

  getUsersPerYear() {
    return this.http.get(environment.backendUrl + '/statistic/userPerYear');
  }

  getTreesPerOrgType() {
    return this.http.get(environment.backendUrl + '/statistic/treesPerOrgType');
  }
}
