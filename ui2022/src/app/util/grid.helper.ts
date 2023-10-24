import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridHelper {
  constructor() {}

  dateFormatter(params) {
    if (params.data && params.data[params.colDef.field]) {
      let date = new Date(params.data[params.colDef.field]);
      let jsonDate = date.toJSON().slice(0, 10);
      let formattedDate =
        jsonDate.slice(8, 10) +
        '.' +
        jsonDate.slice(5, 7) +
        '.' +
        jsonDate.slice(0, 4);
      return formattedDate;
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

  getCartStates() {
    return [
      { value: 'INITIAL', label: 'Initial' },
      { value: 'CALLBACK', label: 'Callback' },
      { value: 'VERIFIED', label: 'Verified' },
      { value: 'DISCARDED', label: 'Discarded' },
      { value: 'GENERATED', label: 'Generated' },
    ];
  }
}
