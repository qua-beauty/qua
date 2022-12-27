const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');

const orderScene = new Scenes.WizardScene('ORDER_SCENE',
  (ctx) => {
    const {message_id, text, chat: {id}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');

    return getOrder(orderId).then((order) => {
      ctx.telegram.deleteMessage(id, message_id);
      ctx.reply(Message.orderCreated(order), {
        parse_mode: 'MarkdownV2'
      });
      return ctx.wizard.next();
    });
  },
  (ctx) => {
    ctx.reply('I got your location thanks');
    console.log(ctx.wizard);
    return ctx.scene.leave();
  },
);

module.exports = {
  orderScene
};