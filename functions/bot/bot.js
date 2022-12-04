const {Telegraf} = require('telegraf');
const {firestore} = require('./firebase.js');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  console.log(ctx.update.message)
  if(!ctx.startPayload) return ctx.reply(`No Payload, eee`);

  const user = ctx.update.message.from;
  const orderId = ctx.startPayload;

  const orderRef = await firestore.collection('basket').doc(orderId);
  const order = await orderRef.get();

  if(order.exists) {
    await orderRef.update({
      telegramUser: user
    })
  }

  return ctx.reply(`Hello` + user.username);
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

module.exports = {handler};
