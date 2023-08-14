import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PagedData } from '../store/app.state';
import { CreateCertificateRequestDto, findCertificatePlantings } from '../store/profile.store';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  loadUserDetails(username: string) {
    return this.http.get(environment.backendUrl + '/user?userName=' + username);
  }

  isAdmin() {
    return this.http.get(environment.backendUrl + '/isAdmin');
  }

  loadTrees(username: string, page: number, size: number) {
    return this.http.get<PagedData<any>>(
      `${environment.backendUrl}/trees/owner?userName=${username}&page=${page}&size=${size}`,
    );
  }

  updateProfile(username: string, propertyToUpdate: string, controlValue) {
    return this.http.post(
      environment.backendUrl +
        '/user/edit?userName=' +
        encodeURIComponent(username) +
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
}
