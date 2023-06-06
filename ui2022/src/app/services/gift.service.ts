import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProfileGift } from '../store/profile.store';

export declare type GiftStatus = 'NEW' | 'REDEEMED' | 'UNREDEEMED';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  constructor(private http: HttpClient) {}

  getGiftsAsConsignor(userName: string) {
    return this.http.get<ProfileGift[]>(
      environment.backendUrl + '/gift/search/consignor?userName=' + userName,
    );
  }

  getGiftsAsRecipient(userName: string) {
    return this.http.get<ProfileGift[]>(
      environment.backendUrl + '/gift/search/recipient?userName=' + userName,
    );
  }

  redeemGift(code: string) {
    return this.http.post(environment.backendUrl + '/code/redeem?codeString=' + code, {});
  }

  
  openGiftPdf(id: number) {
    return this.http.get(environment.backendUrl + '/gift/pdf?giftId=' + id, { responseType: 'arraybuffer' });
  }
}
