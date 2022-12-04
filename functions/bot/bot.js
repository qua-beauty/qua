const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
  return ctx.reply(`Hello Freak`);
});

bot.launch();

const handler = async (request, response) => {
  try {
    return {statusCode: 200, body: ''};
  } catch (e) {
    console.log(e);
    return {statusCode: 400, body: 'This endpoint is meant for bot and telegram communication'};
  }
};

module.exports = {handler};
