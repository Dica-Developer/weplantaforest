import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TreeTypeAdmin } from '../store/treeType.store';

@Injectable({
  providedIn: 'root',
})
export class TreeTypeService {
  constructor(private http: HttpClient) {}

  loadAll() {
    return this.http.get(environment.backendUrl + '/treeTypes');
  }

  loadAllForAdmin() {
    return this.http.get(environment.backendAdminUrl + '/treeTypes');
  }

  save(request: TreeTypeAdmin) {
    return this.http.post(
      environment.backendAdminUrl + '/treeType/save',
      request
    );
  }

  imageUpload(treeTypeId: number, file: any) {
    let formData: any = new FormData();
    formData.append('treeTypeId', treeTypeId);
    formData.append('file', file);
    return this.http.post(
      environment.backendAdminUrl + '/treeType/imageUpload',
      formData
    );
  }

  delete(treeTypeId: number) {
    return this.http.delete(
      environment.backendAdminUrl + '/treeType/delete?TreeTypeId=' + treeTypeId
    );
  }
}
