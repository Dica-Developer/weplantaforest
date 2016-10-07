export function getTextForSelectedLanguage(text) {
  if (text.includes('<mlpr>')) {
    if (localStorage.getItem('language') === 'DEUTSCH') {
      text = text.substr(text.indexOf('GERMAN<equ>') + 11);
      text = text.substr(0, text.indexOf('<sep>ENGLISH'));
    } else if (localStorage.getItem('language') === 'ENGLISH') {
      text = text.substr(text.indexOf('ENGLISH<equ>') + 12);
      text = text.substr(0, text.indexOf('<sep>ITALIAN'))
    }
  }
  return text;
};

export function getShortText(text, shortenedTO){
  if (text.length > shortenedTO) {
    text = text.substr(0, shortenedTO);
    text = text.substr(0, Math.min(shortenedTO, text.lastIndexOf(" ")));
    text = text + "... ";
  }
  return text;
}

export {
  getTextForSelectedLanguage, getShortText
};
