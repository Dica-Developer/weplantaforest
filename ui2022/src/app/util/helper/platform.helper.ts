import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformHelper {
  isBrowser: boolean;
  localstorage: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: Document) {
    this.localstorage = document.defaultView?.localStorage;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getLocalstorage(key: string) {
    return this.localstorage?.getItem(key);
  }

  setLocalstorage(key: string, value: string) {
    this.localstorage.setItem(key, value);
  }

  removeLocalstorage(key: string) {
    this.localstorage.removeItem(key);
  }

  checkIfBrowser() {
    return this.isBrowser
  }

  scrollTop() {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

}

