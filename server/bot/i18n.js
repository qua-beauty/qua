import i18next from 'https://deno.land/x/i18next/index.js';
import Backend from 'https://deno.land/x/i18next_fs_backend/index.js';

i18next
  .use(Backend)
  .init({
    initImmediate: false,
    backend: {
      loadPath: '../shared/locales/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'ru']
  });

export const i18n = i18next;
