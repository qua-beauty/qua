import {Bot, session} from 'https://deno.land/x/grammy/mod.ts';
import {conversations, createConversation} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import {actions, masks, parseMode} from './utils.js';
import {messages} from './messages.js';
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

export const bot = new Bot(Deno.env.get('TELEGRAM_BOT_TOKEN'));

bot.use(session({
  initial() {
    return {
      newOrder: {
        products: [],
        price: null,
        count: null,
        address: null,
        phone: null,
        user: null,
        orderCardMessage: null,
        getPhoneMessage: null,
        getAddressMessage: null,
        phoneMessage: null,
        addressMessage: null,
        orderCreatedMessage: null
      }
    };
  },
}));

bot.use(conversations());
bot.use(createConversation(orderConversation, 'newOrder'));

bot.catch((error) => {
  console.log(error);
  error.ctx.reply(messages.botError);
});

bot.command('start', async (ctx) => {
  const {text} = ctx.update.message;

  if (masks.shop.test(text)) {
    const shopId = text.split('-')[1];
    await ctx.reply(messages.startShop(shopId), {
      reply_markup: startShopKeyboard(shopId)
    });
  } else {
    await ctx.reply(messages.start, {
      reply_markup: startKeyboard
    });
  }
});

bot.hears(masks.order, async (ctx) => {
  console.log('hears', ctx);

  await ctx.conversation.enter('newOrder');
});

bot.callbackQuery(new RegExp(actions.ABOUT), async (ctx) => {
  await ctx.editMessageText(messages.about, parseMode);
  await ctx.editMessageReplyMarkup({
    reply_markup: aboutKeyboard
  })
});

bot.callbackQuery(new RegExp(actions.HOME), async (ctx) => {
  await ctx.editMessageText(messages.start);
  await ctx.editMessageReplyMarkup({
    reply_markup: startKeyboard
  })
});

bot.callbackQuery(new RegExp(actions.CANCEL_ORDER), cancelOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DECLINE_ORDER), shopDeclineOrder);
bot.callbackQuery(new RegExp(actions.SHOP_ACCEPT_ORDER), shopAcceptOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DELIVERY_ORDER), shopDeliveryOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DONE_ORDER), shopDoneOrder);
bot.callbackQuery(new RegExp(actions.BACK_TO_HOME), backToHome);