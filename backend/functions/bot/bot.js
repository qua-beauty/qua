const {Telegraf, Scenes, session} = require('telegraf');
const {startScene} = require('./scenes/start.js');
const {createNewOrderScene} = require('./scenes/createNewOrder.js');
const {masks} = require('./utils.js');
const {sceneNames, actionNames} = require('./constants.js');
const {cancelOrder, shopDeclineOrder, shopAcceptOrder} = require('./actions/orderActions.js');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([startScene, createNewOrderScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  await ctx.scene.enter(sceneNames.START);
});

bot.hears(masks.order, async (ctx) => {
  ctx.scene.reset();
  await ctx.scene.enter(sceneNames.CREATE_NEW_ORDER);
});

bot.action(new RegExp(actionNames.CANCEL_ORDER, 'gi'), cancelOrder);
bot.action(new RegExp(actionNames.SHOP_DECLINE_ORDER, 'gi'), shopDeclineOrder);
bot.action(new RegExp(actionNames.SHOP_ACCEPT_ORDER, 'gi'), shopAcceptOrder);

const handler = async (event) => {
  try {
    console.log(event)
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
