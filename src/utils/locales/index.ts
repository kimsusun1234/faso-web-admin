import I18n from 'i18n-js';
import { convertLanguageJsonToObject } from './translations'

import en from './en/translation.json';


export const translationJson = {
  en: {
    translation: en
  }
}

convertLanguageJsonToObject(en);
I18n.fallbacks = true
I18n.translations = {
  en
}
I18n.locale = 'en'
export default I18n
export const _t = (id: string, ...rest: any[]): [string, ...any[]] => {
  if (!id) {
    id = '_NOT_TRANSLATED_';
  }
  return [id, ...rest];
};