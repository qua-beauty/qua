const {Telegraf, Scenes, session} = require('telegraf');
const {createNewOrderScene} = require('./bot/scenes/createNewOrder.js');
const {masks} = require('./bot/utils.js');
const {sceneNames, actionNames} = require('./bot/constants.js');
const {cancelOrder, shopDeclineOrder, shopAcceptOrder, backToHome} = require('./bot/actions/orderActions.js');
const {messages} = require('./bot/messages.js');
const {keyboards} = require('./bot/keyboards.js');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true, allowedHeaders: ['POST', 'GET', 'PUT', 'DELETE']});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const stage = new Scenes.Stage([createNewOrderScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  const openShopRegExp = new RegExp('openShop', 'gi');
  const payload = ctx.startPayload;
  if(openShopRegExp.test(payload)) {
    const shopId = payload.split('-')[1];
    await ctx.reply(messages.startShop(shopId), keyboards.startShop(shopId));
  } else {
    await ctx.reply(messages.start, keyboards.start);
  }
});

bot.hears(masks.order, async (ctx) => {
  ctx.scene.reset();
  await ctx.scene.enter(sceneNames.CREATE_NEW_ORDER);
});

bot.action(new RegExp(actionNames.CANCEL_ORDER, 'gi'), cancelOrder);
bot.action(new RegExp(actionNames.SHOP_DECLINE_ORDER, 'gi'), shopDeclineOrder);
bot.action(new RegExp(actionNames.SHOP_ACCEPT_ORDER, 'gi'), shopAcceptOrder);
bot.action(new RegExp(actionNames.BACK_TO_HOME, 'gi'), backToHome);

exports.botApi = bot;

exports.bot = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    functions.logger.log('Incoming message', request.body);
    const payload = request.body;

    try {
      return await bot.handleUpdate(payload).then((rv) => {
        !rv && response.set('Cache-Control', 'public, max-age=300, s-maxage=600').sendStatus(200);
      })
    } catch (e) {
      console.log(e);
      return response.send({
        statusCode: 400,
        body: 'This endpoint is meant for bot and telegram communication'
      });

    }
  });
});
