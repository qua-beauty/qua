import i18next from 'https://deno.land/x/i18next/index.js';
import botEn from "../../shared/locales/en/bot.json" assert { type: "json" };
import botRu from "../../shared/locales/ru/bot.json" assert { type: "json" };

i18next
  .init({
    lng: 'ru',
    defaultNS: 'bot',
    resources: {
      en: {
        bot: botEn
      },
      ru: {
        bot: botRu
      }
    },
  });

export const i18n = i18next;
export const t = (key, lng) => i18next.getFixedT(lng)(key);
