import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../store/carts.store';
import { PaymentDataDto } from '../store/payment.store';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  convertPlantBagToCart(plantBag: any): Observable<number> {
    return this.http.post<number>(environment.backendUrl + '/donateTrees', plantBag);
  }

  payCart(paymentData: PaymentDataDto) {
    return this.http.post(environment.backendUrl + '/pay', paymentData);
  }

  loadLastPayedCart(): Observable<Cart> {
    return this.http.get<Cart>(environment.backendUrl + '/carts/last');
  }
}
