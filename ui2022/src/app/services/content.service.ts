import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  loadAll() {
    return this.http.get(
      environment.backendArticleManagerUrl + '/backOffice/articles'
    );
  }
}
