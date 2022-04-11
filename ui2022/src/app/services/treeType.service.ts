import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TreeTypeService {
  constructor(private http: HttpClient) {}

  loadAll() {
    return this.http.get(environment.backendUrl + '/treeTypes');
  }

}