import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformHelper {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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

