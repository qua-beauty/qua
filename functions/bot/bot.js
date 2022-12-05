const {Telegraf} = require('telegraf');
const {firestore} = require('./firebase.js');
const firebase = require('firebase-admin');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  if (!ctx.startPayload) return ctx.reply(`No Payload, eee`);

  const user = ctx.update.message.from;
  const orderId = ctx.startPayload;

  const orderRef = await firestore.collection('basket').doc(orderId);
  const order = await orderRef.get();

  if (!order.exists) return ctx.reply('No order found');

  const token = await firebase.auth().createCustomToken(user.id.toString());
  await orderRef.update({
    user: user.id,
    token
  });

  const {products} = order.data();
  const productsMessage = products.reduce((acc, product) => {
    return acc + `${product.count} ${product.title} \n `;
  }, '');

  const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0);

  return ctx.reply(`
    Здравствуйте, мы сформировали ваш заказ \n
    ${productsMessage}
    на общую сумму ${sum} \n
    Подскажите куда привезти товар?`);
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
