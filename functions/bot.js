import {Bot, session} from 'https://deno.land/x/grammy/mod.ts';
import {conversations, createConversation} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import {run} from 'https://deno.land/x/grammy_runner@v1.0.4/mod.ts';
import {load} from 'https://deno.land/std/dotenv/mod.ts';
import {actions, masks} from './bot/utils.js';
import {messages} from './bot/messages.js';
import {startKeyboard, startShopKeyboard} from './bot/keyboards.js';
import {orderConversation} from './bot/conversations/orderConversation.js';
import {
  backToHome,
  cancelOrder,
  deliveryAcceptOrder,
  shopAcceptOrder,
  shopDeclineOrder,
  shopDoneOrder
} from './bot/actions/orderActions.js';

const env = await load();

const bot = new Bot(env['TELEGRAM_BOT_TOKEN']);

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
  await ctx.conversation.enter('newOrder');
});

bot.callbackQuery(new RegExp(actions.CANCEL_ORDER), cancelOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DECLINE_ORDER), shopDeclineOrder);
bot.callbackQuery(new RegExp(actions.SHOP_ACCEPT_ORDER), shopAcceptOrder);
bot.callbackQuery(new RegExp(actions.DELIVERY_ACCEPT_ORDER), deliveryAcceptOrder);
bot.callbackQuery(new RegExp(actions.SHOP_DONE_ORDER), shopDoneOrder);
bot.callbackQuery(new RegExp(actions.BACK_TO_HOME), backToHome);

run(bot);