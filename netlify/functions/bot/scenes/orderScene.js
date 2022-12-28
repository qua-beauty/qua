const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');

const orderScene = new Scenes.WizardScene('ORDER_SCENE',
  async (ctx) => {
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    console.log(order)

    await ctx.reply(Message.orderCreated(order), {
      parse_mode: 'MarkdownV2'
    });

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