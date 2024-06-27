import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TextHelper {
  constructor(private translateService: TranslateService) {}

  getTextForLanguage(text, language) {
    if (text && text.includes('<mlpr>')) {
      if (language === 'de' || language === 'DEUTSCH') {
        text = text.substr(text.indexOf('GERMAN<equ>') + 11);
        text = text.substr(0, text.indexOf('<sep>ENGLISH'));
      } else if (language === 'en' || language === 'ENGLISH') {
        text = text.substr(text.indexOf('ENGLISH<equ>') + 12);
        text = text.substr(0, text.indexOf('<sep>ITALIAN'));
      }
    }
    return text;
  }

  getCurrentLanguage() {
    let lang: string;
    if (this.translateService.currentLang === 'de') {
      lang = 'DEUTSCH';
    } else if (this.translateService.currentLang === 'en') {
      lang = 'ENGLISH';
    }
    return lang;
  }

  createMultiLanguageEntry(germanText, englishText) {
    return '<mlpr>GERMAN<equ>' + germanText + '<sep>ENGLISH<equ>' + englishText + '<sep>ITALIAN';
  }
}
