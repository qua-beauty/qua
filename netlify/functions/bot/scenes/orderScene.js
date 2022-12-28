const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');

const orderScene = new Scenes.WizardScene('ORDER_SCENE',
  async (ctx) => {
    const {message_id:messageId, text, chat: {id:chatId}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    await ctx.telegram.deleteMessage(chatId, messageId);
    await ctx.reply(Message.orderCreated(order), {
      parse_mode: 'MarkdownV2'
    });
    await ctx.reply('Куда доставить заказ?');

    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply('I got your location thanks');
    return ctx.scene.leave();
  },
);

module.exports = {
  orderScene
};