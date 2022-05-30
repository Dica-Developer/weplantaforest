import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventRequest } from '../store/events.store';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  loadEvents() {
    return this.http.get(environment.backendAdminUrl + '/events');
  }

  loadEvent(id: number) {
    return this.http.get(environment.backendAdminUrl + '/event/' + id);
  }

  loadEventCodes(id: number) {
    return this.http.get(environment.backendAdminUrl + '/event/codes/' + id);
  }

  create(request: EventRequest) {
    return this.http.post(environment.backendAdminUrl + '/event', request);
  }

  save(request: EventRequest) {
    return this.http.put(environment.backendAdminUrl + '/event', request);
  }
}
