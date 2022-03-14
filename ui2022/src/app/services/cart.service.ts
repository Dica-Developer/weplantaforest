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

  saveAddress(cartId: number, field: string, value: string) {
    const request = {};
    request[field] = value;
    return this.http.put(environment.backendAdminUrl + '/cart/' + cartId + '/address', request);
  }

  changeReceiptableFlag(cartId: number, value: boolean) {
    return this.http.post(environment.backendAdminUrl + '/cart/receiptable?cartId=' + cartId + '&receiptable=' + value, {});
  }

  updateStatus(cartId: number, value: string) {
    return this.http.post(environment.backendAdminUrl + '/cart/changeState?cartId=' + cartId + '&cartState=' + value, {});
  }
}
