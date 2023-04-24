import {telegramUserMapper} from '../../../shared/mappers.js';
import {getUser, saveUser, getOrder} from '../../services/airtable.js';
import {masks} from '../utils.js';
import {t} from '../i18n.js';
import {startKeyboard, startShopKeyboard} from '../keyboards.js';

const checkReferral = (url) => {
  const pattern = /\bref-([\d]+)\b/;
  const match = url.match(pattern);

  if (match) {
    return match[1];
  }

  return false;
}

const start = async (ctx) => {
  const {text, from} = ctx.update.message;
  let userData = telegramUserMapper(from);

  const user = await getUser(userData.id);

  if(user) {
    ctx.session.user = user;
  } else {
    if(ctx?.match) {
      try {
        const referrer = checkReferral(ctx.match);

        if(referrer) {
          const referrerUser = await getUser(referrer);

          userData = {
            ...userData,
            referrer: referrerUser.id
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

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