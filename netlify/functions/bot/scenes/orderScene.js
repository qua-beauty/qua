const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');

const orderScene = new Scenes.WizardScene('ORDER_SCENE',
  async (ctx) => {
    const {text} = ctx.update.message;
    const match = text.match(masks.order);

    await ctx.reply('jdet vas '+match[0], {
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