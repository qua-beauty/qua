import {i18n} from '../i18n.js';

export function i18nMiddleware() {
  return async (ctx, next) => {
    Object.defineProperty(ctx, "i18n", {
      value: {
        i18n,
        changeLanguage: i18n.changeLanguage,
        t: i18n.t
      },
    });

    await next();
  };
}