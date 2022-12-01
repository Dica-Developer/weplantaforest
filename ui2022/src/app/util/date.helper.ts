import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelper {
  constructor() {}

  subtractMonths(date, months) {
    var result = new Date(date);
    result.setDate(result.getMonth() - months);
    return result;
  }
}
