import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ContentArticleDetails } from '../store/content.store';

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

  delete(id: number) {
    return this.http.delete(
      environment.backendArticleManagerUrl +
        '/backOffice/article?articleId=' +
        id
    );
  }

  getDetails(id: number) {
    return this.http.get(
      environment.backendArticleManagerUrl +
        '/backOffice/article?articleId=' +
        id
    );
  }

  getArticleTypes() {
    return this.http.get(
      environment.backendArticleManagerUrl + '/articleTypes'
    );
  }

  editArticle(request: ContentArticleDetails, userName: string) {
    return this.http.post(
      environment.backendArticleManagerUrl +
        '/backOffice/article/edit?userName=' +
        userName,
      request
    );
  }

  uploadArticleImage(file: any, articleId: number) {
    let formData: any = new FormData();
    formData.append('articleId', articleId);
    formData.append('file', file);
    return this.http.post(
      environment.backendArticleManagerUrl + '/article/upload/image',
      formData
    );
  }

  uploadParagraphImage(file: any, articleId: number, paragraphId: number) {
    let formData: any = new FormData();
    formData.append('paragraphId', paragraphId);
    formData.append('articleId', articleId);
    formData.append('file', file);
    return this.http.post(
      environment.backendArticleManagerUrl + '/paragraph/upload/image',
      formData
    );
  }
}