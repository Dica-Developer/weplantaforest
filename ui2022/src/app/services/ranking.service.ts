import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class RankingService {
  constructor(private http: HttpClient) {}

  loadAll(pageSize: number, lastYear: boolean) {
    return this.http.get(environment.backendUrl + '/ranking/bestUser?page=0&size=' + pageSize + '&lastYear=' + lastYear)
  }
}