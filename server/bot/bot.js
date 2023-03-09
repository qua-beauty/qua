import {Bot} from 'https://deno.land/x/grammy/mod.ts';
import {conversations, createConversation} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import {hydrateReply, parseMode} from 'https://deno.land/x/grammy_parse_mode@1.5.0/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import './polyfills.js';
import {actions, masks} from './utils.js';
import {orderConversation} from './conversations/orderConversation.js';
import {t} from './i18n.js';
import {language} from './plugins/language.js';
import cancelOrder from './actions/cancelOrder.js';
import shopDeclineOrder from './actions/shopDeclineOrder.js';
import shopDeliveryOrder from './actions/shopDeliveryOrder.js';
import shopDoneOrder from './actions/shopDoneOrder.js';
import backToHome from './actions/backToHome.js';
import changeLanguage from './actions/changeLanguage.js';
import about from './actions/about.js';
import start from './actions/start.js';
import {session} from './session.js';
import shopCookOrder from './actions/shopCookOrder.js';

export const bot = new Bot(Deno.env.get('TELEGRAM_BOT_TOKEN'));

bot.use(session());
bot.use(language());
bot.use(conversations());
bot.use(createConversation(orderConversation, 'newOrder'));

bot.use(hydrateReply);
bot.api.config.use(parseMode("HTML"));

bot.catch((error) => {
  console.log(error);
  error.ctx.reply(t('messageBotError', error.ctx.session.language));
});

bot.command('start', start);

bot.hears(masks.order, async (ctx) => {
  await ctx.conversation.enter('newOrder');
});

bot.callbackQuery(new RegExp(actions.ABOUT), about);
bot.callbackQuery(new RegExp(actions.CHANGE_LANGUAGE), changeLanguage);
bot.callbackQuery(new RegExp(actions.CANCEL_ORDER), (ctx) => cancelOrder(ctx));
bot.callbackQuery(new RegExp(actions.SHOP_DECLINE_ORDER), shopDeclineOrder);
bot.callbackQuery(new RegExp(actions.SHOP_COOK_ORDER), shopCookOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DELIVERY_ORDER), shopDeliveryOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DONE_ORDER), shopDoneOrder);
bot.callbackQuery(new RegExp(actions.BACK_TO_HOME), backToHome);
bot.callbackQuery(new RegExp(actions.HOME), backToHome);