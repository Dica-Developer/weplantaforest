import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactRequest } from '../store/contact.store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getTreesPerYear():Observable<any> {
    return this.http.get(environment.backendUrl + '/statistic/treesPerYear');
  }

  getCo2():Observable<any>{
    return this.http.get(environment.backendUrl + '/statistic/co2');
  }

  getUsersPerYear():Observable<any> {
    return this.http.get(environment.backendUrl + '/statistic/userPerYear');
  }

  getTreesPerOrgType():Observable<any> {
    return this.http.get(environment.backendUrl + '/statistic/treesPerOrgType');
  }
}
