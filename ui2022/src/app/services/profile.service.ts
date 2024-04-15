import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PagedData } from '../store/app.state';
import { CreateCertificateRequestDto } from '../store/profile.store';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  loadUserDetails(userId: number) {
    return this.http.get(environment.backendUrl + '/user?userId=' + userId);
  }

  isAdmin() {
    return this.http.get(environment.backendUrl + '/isAdmin');
  }

  loadTrees(userId: number, page: number, size: number) {
    return this.http.get<PagedData<any>>(
      environment.backendUrl + "/trees/owner?userId=" + userId + "&page=" + page + "&size=" + size,
    );
  }

  updateProfile(userId: number, propertyToUpdate: string, controlValue) {
    return this.http.post(
      environment.backendUrl +
        '/user/edit?userId=' + userId +
        '&toEdit=' +
        propertyToUpdate +
        '&newEntry=' +
        encodeURIComponent(controlValue),
      {},
    );
  }

  createCertificate(requestDto: CreateCertificateRequestDto) {
    return this.http.post(environment.backendUrl + '/certificate/create', requestDto, {
      responseType: 'text',
    });
  }

  openCertificatePdf(id: string) {
    return this.http.get(environment.backendUrl + '/certificate/pdf/' + id, {
      responseType: 'arraybuffer',
    });
  }

  findCertificatePlantings(id: string) {
    return this.http.get(environment.backendUrl + '/certificate/search/' + id);
  }

  findCertificateSummary(id: string) {
    return this.http.get(environment.backendUrl + '/certificate/summary/' + id);
  }

  updateProfileImage(userId: number, image: any) {
    const formData = new FormData();
    formData.append('userId', userId + '');
    formData.append('file', image);
    return this.http.post(environment.backendUrl + '/user/image/upload', formData, {
      responseType: 'text',
    });
  }
}
