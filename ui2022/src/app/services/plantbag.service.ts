import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantbagService {
  constructor(private http: HttpClient) {}

  validatePlantbag(request: any) {
    return this.http.post(environment.backendUrl + '/validatePlantBag', request);
  }

  plantForUser(request: any) {
    return this.http.post(environment.backendUrl + '/plantForUser/', request);
  }
}
