const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {
    const {text} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');

    const {message_id: messageId} = await ctx.reply(
      messages.orderWhereToDelivery,
      keyboards.orderDeliveryAddress
    );

    ctx.scene.state = {
      orderId,
      messageId
    };
    return ctx.wizard.next();
  },
  async (ctx) => {
    const {message_id: uMessageId, chat: {id: chatId}, text, location} = ctx.update.message;

    const {message_id: messageId} = await ctx.reply(
      messages.orderPhoneNumber,
      keyboards.orderPhoneNumber
    );
    await ctx.deleteMessage(ctx.scene.state.messageId);
    await ctx.telegram.deleteMessage(chatId, uMessageId);

    ctx.scene.state = {
      ...ctx.scene.state,
      messageId,
      location: location ? location : text
    };
    return ctx.wizard.next();

  },
  async (ctx) => {
    const {message_id: uMessageId, chat: {id: chatId}, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.phoneNumber = contact.phone_number;
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;
    } else {
      return await ctx.reply(messages.orderPhoneNumberInvalid);
    }

    await updateOrder(ctx.wizard.state.orderId, {
      location: ctx.wizard.state.location,
      phoneNumber: ctx.wizard.state.phoneNumber
    });

    await ctx.reply(
      messages.orderCreated,
      keyboards.removeKeyboard
    );

    await ctx.deleteMessage(ctx.scene.state.messageId);
    await ctx.telegram.deleteMessage(chatId, uMessageId);

    return await ctx.scene.leave();
  },
);

module.exports = {
  createNewOrderScene
};