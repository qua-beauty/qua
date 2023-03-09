import {t} from '../i18n.js';
import {aboutKeyboard} from '../keyboards.js';

const about = async (ctx) => {
  await ctx.editMessageText(t('messageAbout', ctx.session.language));
  await ctx.editMessageReplyMarkup({
    reply_markup: aboutKeyboard(ctx)
  })
}

export default about;