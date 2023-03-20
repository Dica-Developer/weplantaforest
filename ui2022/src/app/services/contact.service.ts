import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactRequest } from '../store/contact.store';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  submitContactRequest(request: ContactRequest) {
    return this.http.post(environment.backendUrl + '/contact', request);
  }
}
