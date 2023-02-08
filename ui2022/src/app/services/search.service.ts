import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(searchValue: string) {
    return this.http.get(environment.backendUrl + '/search?searchValue=' + searchValue);
  }
}
