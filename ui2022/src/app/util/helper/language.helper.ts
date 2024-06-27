import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageHelper {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getUserLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('lang');
      if (lang) {
        return lang;
      } else {
        if (
          navigator.language === 'en-US' ||
          navigator.language === 'en' ||
          navigator.language === 'en-GB'
        ) {
          return 'en';
        } else {
          return 'de';
        }
      }
    } else {
      // Default language for server-side rendering
      return 'de';
    }
  }
}
