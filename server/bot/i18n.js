import i18next from 'https://deno.land/x/i18next/index.js';
import botEn from "../../shared/locales/en/bot.json" assert { type: "json" };
import botRu from "../../shared/locales/ru/bot.json" assert { type: "json" };
import commonEn from "../../shared/locales/en/common.json" assert { type: "json" };
import commonRu from "../../shared/locales/ru/common.json" assert { type: "json" };

i18next
  .init({
    lng: 'ru',
    defaultNS: 'bot',
    resources: {
      en: {
        bot: botEn,
        common: commonEn,
      },
      ru: {
        bot: botRu,
        common: commonRu
      }
    },
  });

export const i18n = i18next;
export const t = (key, lng, options) => i18next.getFixedT(lng)(key, options);
