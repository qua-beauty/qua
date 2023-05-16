import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import reactEn from '../shared/locales/en/react.json';
import reactRu from '../shared/locales/ru/react.json';
import reactUa from '../shared/locales/ua/react.json';
import commonRu from '../shared/locales/ru/common.json';
import commonUa from '../shared/locales/ua/common.json';
import commonEn from '../shared/locales/en/common.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        react: reactEn,
        common: commonEn
      },
      ru: {
        react: reactRu,
        common: commonRu
      },
      ua: {
        react: reactUa,
        common: commonUa
      }
    },
    fallbackLng: "ua",
    fallbackNS: 'react',

    interpolation: {
      escapeValue: false
    }
  });

export const i18n = i18next;