import {Bot, session} from 'https://deno.land/x/grammy/mod.ts';
import {conversations, createConversation} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import {hydrateReply, parseMode} from 'https://deno.land/x/grammy_parse_mode@1.5.0/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import './polyfills.js';
import {actions, masks} from './utils.js';
import {aboutKeyboard, startKeyboard, startShopKeyboard} from './keyboards.js';
import {orderConversation} from './conversations/orderConversation.js';
import {
  backToHome,
  cancelOrder,
  shopAcceptOrder,
  shopDeclineOrder,
  shopDeliveryOrder,
  shopDoneOrder
} from './actions/orderActions.js';
import {getUser, saveUser} from './services.js';
import {telegramUserMapper} from '../../shared/mappers.js';
import {i18n, t} from './i18n.js';
import {language} from './plugins/language.js';

export const bot = new Bot(Deno.env.get('TELEGRAM_BOT_TOKEN'));

function getSessionKey(ctx) {
  return ctx.from?.id.toString();
}

bot.use(session({
  getSessionKey,
  initial() {
    return {
      newOrder: {
        products: [],
        price: null,
        count: null,
        address: null,
        phone: null,
        user: null,
        getPhoneMessage: null,
        getAddressMessage: null,
        phoneMessage: null,
        addressMessage: null,
        orderCreatedMessage: null
      },
      user: {
        name: null,
        username: null,
        address: null,
        phone: null,
        telegramId: null,
        language: null
      },
      language: 'en'
    };
  },
}));

bot.use(language());
bot.use(conversations());
bot.use(createConversation(orderConversation, 'newOrder'));

bot.use(hydrateReply);
bot.api.config.use(parseMode("HTML"));

bot.catch((error) => {
  console.log(error);
  error.ctx.reply(t('messageBotError', error.ctx.session.language));
});

bot.command('start', async (ctx) => {
  const {text, from} = ctx.update.message;
  const userData = telegramUserMapper(from);

  const user = await getUser(userData.id);

  if(user) {
    ctx.session.user = user;
  } else {
    ctx.session.user = await saveUser(userData);
  }

  if (masks.shop.test(ctx.match)) {
    const shopId = text.split('-')[1];
    await ctx.reply(t('messageStartShop', ctx.session.language), {
      reply_markup: startShopKeyboard(ctx, shopId)
    });
  } else {
    await ctx.reply(t('messageStart', ctx.session.language), {
      reply_markup: startKeyboard(ctx)
    });
  }
});

bot.hears(masks.order, async (ctx) => {
  await ctx.conversation.enter('newOrder');
});

bot.callbackQuery(new RegExp(actions.ABOUT), async (ctx) => {
  await ctx.editMessageText(t('messageAbout', ctx.session.language));
  await ctx.editMessageReplyMarkup({
    reply_markup: aboutKeyboard(ctx)
  })
});

bot.callbackQuery(new RegExp(actions.HOME), async (ctx) => {
  await ctx.editMessageText(t('messageStart', ctx.session.language));
  await ctx.editMessageReplyMarkup({
    reply_markup: startKeyboard(ctx)
  })
});

bot.callbackQuery(new RegExp(actions.CHANGE_LANGUAGE), async (ctx) => {
  await ctx.editMessageText(t('messageChangeLanguage', ctx.session.language));
  await ctx.editMessageReplyMarkup({
    reply_markup: startKeyboard(ctx)
  })
});

bot.callbackQuery(new RegExp(actions.CANCEL_ORDER), cancelOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DECLINE_ORDER), shopDeclineOrder);
bot.callbackQuery(new RegExp(actions.SHOP_ACCEPT_ORDER), shopAcceptOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DELIVERY_ORDER), shopDeliveryOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DONE_ORDER), shopDoneOrder);
bot.callbackQuery(new RegExp(actions.BACK_TO_HOME), backToHome);