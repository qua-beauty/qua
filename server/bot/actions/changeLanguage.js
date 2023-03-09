import {t} from '../i18n.js';
import {startKeyboard} from '../keyboards.js';

const changeLanguage = async (ctx) => {
  await ctx.editMessageText(t('messageChangeLanguage', ctx.session.language));
  await ctx.editMessageReplyMarkup({
    reply_markup: startKeyboard(ctx)
  })
}

export default changeLanguage;