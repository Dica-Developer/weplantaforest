import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OfferAreaDTO } from '../store/infrastructure.store';

@Injectable({
  providedIn: 'root',
})
export class InfrastrutureService {
  constructor(private http: HttpClient) {}

  submitOfferArea(offerArea: OfferAreaDTO) {
    return this.http.post(environment.backendUrl + '/project/offer', offerArea);
  }

  generateCaptcha() {
    return this.http.get(environment.backendUrl + '/captcha/generate');
  }
}
