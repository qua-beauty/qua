const {Scenes} = require('telegraf');
const {getOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {Message} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {Keyboard} = require('../keyboards.js');

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {
    const {message_id:messageId, text, chat: {id:chatId}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    await ctx.telegram.deleteMessage(chatId, messageId);
    await ctx.reply(Message.orderCreated(order), {
      parse_mode: 'MarkdownV2'
    });

    await ctx.reply(Message.orderWhereToDelivery, Keyboard.orderDeliveryAddress);

    return ctx.wizard.next();
  },
  async (ctx) => {
    const {location, text} = ctx.update.message;

    ctx.scene.state.location = location ? location : text;

    await ctx.reply(Message.orderPhoneNumber, Keyboard.orderPhoneNumber);

  },
  async (ctx) => {
    const {contact, text} = ctx.update.message;

    if(contact) {
      ctx.scene.state.phoneNumber = contact;
      return ctx.scene.leave();
    } else if(text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;
      return ctx.scene.leave();
    } else {
      await ctx.reply(Message.orderPhoneNumberInvalid);
    }
  }
);

module.exports = {
  createNewOrderScene
};