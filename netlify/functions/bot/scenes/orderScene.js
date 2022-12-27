const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');

const orderScene = new Scenes.WizardScene('ORDER_SCENE',
  async (ctx) => {
    const {message_id, text, chat: {id}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');

    await ctx.telegram.deleteMessage(id, message_id);

    console.log(orderId);
    const order = await getOrder(orderId).catch(e => console.log(e));

    await ctx.reply(Message.orderCreated(order));

    return ctx.wizard.next();
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