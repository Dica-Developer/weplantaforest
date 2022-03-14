import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class GridHelper {
  constructor() {}

  dateFormatter(colData) {
    if (colData.data && colData.data.createdAt) {
      return moment(colData.data.createdAt).format('DD.MM.YYYY');
    } else {
      return '';
    }
  }

  priceFormatter(colData) {
    if (colData.data && colData.data.price) {
      return colData.data.price.toFixed(2);
    } else {
      return '';
    }
  }

  caseInsensitiveComparator(valueA, valueB, nodeA, nodeB, isInverted) {
    if (valueA === valueB) {
      return 0;
    }
    // for null
    else if (!valueA) {
      return isInverted ? -1 : 1;
    } else if (!valueB) {
      return isInverted ? 1 : -1;
    } else {
      return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    }
  }
}
