const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx, par) => {
  console.log(ctx, par);
  return ctx.reply(`Hello Freak`);
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
