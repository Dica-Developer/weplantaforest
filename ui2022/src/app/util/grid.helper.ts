import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class GridHelper {
  constructor() {}

  dateFormatter(colData) {
    if(colData.data && colData.data.createdAt){
      return moment(colData.data.createdAt).format('DD.MM.YYYY');
    }else {
      return '';
    }
  }

  priceFormatter(colData) {
    if(colData.data && colData.data.price){
      return colData.data.price.toFixed(2);
    }else {
      return '';
    }
  }

  
}
