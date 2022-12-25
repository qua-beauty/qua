const {Telegraf} = require('telegraf');
const {getOrder} = require('./services.js');
const {connectTelegram} = require('./auth.js');
const {orderWelcomeReply, welcomeReply} = require('./replies.js');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  return welcomeReply(ctx);
});

bot.on('message', async (ctx) => {
  if (ctx.message.web_app_data) {
    const user = ctx.message.from;
    const data = JSON.parse(ctx.message.web_app_data.data);
    const order = await getOrder(data.orderId);

    await connectTelegram(order.ref, user);
    return orderWelcomeReply(ctx, order.data);
  }
});

const handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body)).then(() => {
      console.log('Received an update from Telegram!', event.body);
    });
    return {statusCode: 200};
  } catch (e) {
    console.log(e);
    return {statusCode: 400, body: 'This endpoint is meant for bot and telegram communication'};
  }
};

module.exports = {
  handler,
  bot
};
