const {Bot, session, webhookCallback} = require('grammy');
const {conversations, createConversation} = require('@grammyjs/conversations');
const {masks} = require('./bot/utils.js');
const {messages} = require('./bot/messages.js');
const {startKeyboard, startShopKeyboard} = require('./bot/keyboards');
const {orderConversation} = require('./bot/conversations/orderConversation');
const {actions} = require('./bot/utils');
const {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  deliveryAcceptOrder,
  shopDoneOrder,
  backToHome
} = require('./bot/actions/orderActions');

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

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

const handleUpdate = webhookCallback(bot, "std/http");

exports.handler = async event => {
  try {
    console.log(JSON.parse(event.body));
    return await handleUpdate(JSON.parse(event.body));
  } catch (e) {
    console.log(e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }
}