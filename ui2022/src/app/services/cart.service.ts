import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartsLoadRequest } from '../store/carts.store';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  loadCarts(request: CartsLoadRequest) {
    return this.http.post(environment.backendAdminUrl + '/carts', request);
  }
}
