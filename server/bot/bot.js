import {Bot} from 'https://deno.land/x/grammy/mod.ts';
import {conversations, createConversation} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import {hydrateReply, parseMode} from 'https://deno.land/x/grammy_parse_mode@1.5.0/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import './polyfills.js';
import {actions, masks} from './utils.js';
import {orderConversation} from './conversations/orderConversation.js';
import {t} from './i18n.js';
import backToHome from './actions/backToHome.js';
import changeLanguage from './actions/changeLanguage.js';
import about from './actions/about.js';
import start from './actions/start.js';
import {session} from './session.js';
import {orderAction} from './actions/orderActions.ts';

export const bot = new Bot(Deno.env.get('TELEGRAM_BOT_TOKEN'));

bot.use(session());
bot.use(conversations());
bot.use(createConversation(orderConversation, 'newOrder'));

bot.use(hydrateReply);
bot.api.config.use(parseMode("HTML"));

bot.catch((error) => {
  console.log(error);
  error.ctx.reply(t('messageBotError'));
});

bot.hears(masks.order, async (ctx) => {
  await ctx.conversation.enter('newOrder');
});

bot.callbackQuery(new RegExp(actions.ABOUT), about);
bot.callbackQuery(new RegExp(actions.CHANGE_LANGUAGE), changeLanguage);
bot.callbackQuery(new RegExp(actions.BACK_TO_HOME), backToHome);
bot.callbackQuery(new RegExp(actions.HOME), backToHome);

bot.callbackQuery(new RegExp(actions.ORDER_CANCEL), orderAction);
bot.callbackQuery(new RegExp(actions.ORDER_DECLINE), orderAction);
bot.callbackQuery(new RegExp(actions.ORDER_ACCEPT), orderAction);
bot.callbackQuery(new RegExp(actions.ORDER_SCHEDULE), orderAction);
bot.callbackQuery(new RegExp(actions.ORDER_COMPLETE), orderAction);
bot.callbackQuery(new RegExp(actions.ORDER_CLOSE), orderAction);