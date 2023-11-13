import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SliderHelper {
  constructor() {}

  returnSliderArray() {
    return [
      { value: 1, legend: `1` },
      { value: 5, legend: `5` },
      { value: 10, legend: `10` },
      { value: 50, legend: `50` },
      { value: 100, legend: `100` },
    ];
  }

  returnSliderArray10() {
    return [
      { value: 1, legend: `1` },
      { value: 2, legend: `2` },
      { value: 5, legend: `5` },
      { value: 10, legend: `10` },
    ];
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }
}
