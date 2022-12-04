const {Telegraf} = require('telegraf');
const {firestore} = require('./firebase.js');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(async (ctx) => {
  if(!ctx.startPayload) return ctx.reply(`No Payload, eee`);

  const user = ctx.update.message.from;
  const orderId = ctx.startPayload;

  const orderRef = await firestore.collection('basket').doc(orderId);
  const order = await orderRef.get();

  if(!order.exists) return ctx.reply('No order found');

  await orderRef.update({
    telegramUser: user
  })

  console.log(order.data());

  const { products } = order.data();

  const productsMessage = products.reduce(async (acc, product) => {
    return acc + `${product.count} ${product.title} \n `
  }, '')

  const sum = products.reduce((acc, product) => acc + parseInt(product.count) * parseInt(product.price), 0)

  return ctx.reply(`
    Здравствуйте, мы сформировали ваш заказ \n
    ${productsMessage}
    на общую сумму ${sum} \n
    Подскажите куда привезти товар?
  ` + user.username);
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
