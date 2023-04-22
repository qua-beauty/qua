import {telegramUserMapper} from '../../../shared/mappers.js';
import {getUser, saveUser, getOrder} from '../../services/airtable.js';
import {masks} from '../utils.js';
import {t} from '../i18n.js';
import {startKeyboard, startShopKeyboard} from '../keyboards.js';

const start = async (ctx) => {
  const {text, from} = ctx.update.message;
  const userData = telegramUserMapper(from);

  const user = await getUser(userData.id);

  if(user) {
    ctx.session.user = user;
  } else {
    ctx.session.user = await saveUser(userData);
  }

  // if user comes from Direct Link
  if(masks.order.test(ctx.match)) {
    return await ctx.conversation.enter('newOrder');
  }

  if (masks.shop.test(ctx.match)) {
    const shopId = text.split('-')[1];
    await ctx.reply(t('messageStartShop'), {
      reply_markup: startShopKeyboard(shopId)
    });
  } else {
    await ctx.reply(t('messageStart'), {
      reply_markup: startKeyboard()
    });
  }
}

export default start;