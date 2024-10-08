import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProjectImageCreateEditRequest, ProjectEditRequest } from '../store/project.store';

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

  deleteProject(id: number) {
    return this.http.delete(environment.backendAdminUrl + '/project/delete?id=' + id);
  }

  loadArticles(id: number) {
    return this.http.get(environment.backendAdminUrl + '/project/articles?projectId=' + id);
  }

  removeArticle(id: number) {
    return this.http.post(
      environment.backendAdminUrl + '/project/article/remove?articleId=' + id,
      {},
    );
  }

  loadImages(projectId: number) {
    return this.http.get(environment.backendAdminUrl + '/project/images?projectId=' + projectId);
  }

  deleteImage(imageId: number, imageFileName: string) {
    return this.http.post(
      environment.backendAdminUrl +
        '/project/image/delete?projectImageId=' +
        imageId +
        '&imageFileName=' +
        imageFileName,
      {},
    );
  }

  createEditImage(projectImageData: ProjectImageCreateEditRequest) {
    return this.http.post(
      environment.backendAdminUrl + '/project/image/createEdit',
      projectImageData,
    );
  }

  uploadImage(imageId: number, file: any) {
    let formData: any = new FormData();
    formData.append('imageId', imageId);
    formData.append('file', file);
    return this.http.post(environment.backendAdminUrl + '/project/image/upload', formData);
  }

  updateProject(request: ProjectEditRequest) {
    return this.http.post(environment.backendAdminUrl + '/project/edit', request);
  }

  updateMainImage(projectId: number, file: any) {
    let formData: any = new FormData();
    formData.append('projectId', projectId);
    formData.append('file', file);
    return this.http.post(environment.backendAdminUrl + '/project/mainImage', formData);
  }

  getActiveProjects() {
    return this.http.get(environment.backendUrl + '/reports/activeProjects');
  }

  getActiveProjectArticlesForProject(projectName: string) {
    return this.http.get(environment.backendUrl + '/project/articles?projectName=' + projectName);
  }
}
