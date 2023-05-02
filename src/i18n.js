import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import botEn from '../shared/locales/en/react.json';
import botRu from '../shared/locales/ru/react.json';
import commonRu from '../shared/locales/ru/common.json';
import commonEn from '../shared/locales/en/common.json';
import {webApp} from './telegram.js';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        react: botEn,
        common: commonEn
      },
      ru: {
        react: botRu,
        common: commonRu
      }
    },
    fallbackLng: "ru",
    fallbackNS: 'react',

    interpolation: {
      escapeValue: false
    }
  });

export const i18n = i18next;