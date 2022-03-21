import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextHelper {
  constructor() {}

  getTextForLanguage(text, language) {
    if (text && text.includes('<mlpr>')) {
      if (language === 'de') {
        text = text.substr(text.indexOf('GERMAN<equ>') + 11);
        text = text.substr(0, text.indexOf('<sep>ENGLISH'));
      } else if (language === 'en') {
        text = text.substr(text.indexOf('ENGLISH<equ>') + 12);
        text = text.substr(0, text.indexOf('<sep>ITALIAN'));
      }
    }
    return text;
  }

  createMultiLanguageEntry(germanText, englishText) {
    return (
      '<mlpr>GERMAN<equ>' +
      germanText +
      '<sep>ENGLISH<equ>' +
      englishText +
      '<sep>ITALIAN'
    );
  }
}
