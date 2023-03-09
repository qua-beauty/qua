import {t} from '../i18n.js';
import {startKeyboard} from '../keyboards.js';

const backToHome = async (ctx) => {
  await ctx.reply(t('messageStart', ctx.session.language), startKeyboard);
};

export default backToHome;