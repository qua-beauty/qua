const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {

    // move to react
    const {message_id: uMessageId, text, chat: {id: chatId}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    await ctx.reply(messages.orderDraftCreated(order), {
      parse_mode: 'MarkdownV2'
    });

    await ctx.reply(
      messages.orderWhereToDelivery,
      keyboards.orderDeliveryAddress
    );

    await ctx.telegram.deleteMessage(chatId, uMessageId);

    ctx.scene.state.orderId = orderId;
    return ctx.wizard.next();
  },
  async (ctx) => {
    const {message_id: uMessageId, chat: {id: chatId}, text, location} = ctx.update.message;

    await ctx.reply(
      messages.orderPhoneNumber,
      keyboards.orderPhoneNumber
    );
    await ctx.telegram.deleteMessage(chatId, uMessageId);

    ctx.scene.state.location = location ? location : text
    return ctx.wizard.next();

  },
  async (ctx) => {
    const {message_id: uMessageId, chat: {id: chatId}, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.phoneNumber = contact.phone_number;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.reply(
        messages.orderCreated,
        keyboards.removeKeyboard
      );
      await ctx.telegram.deleteMessage(chatId, uMessageId);

      return await ctx.scene.leave();
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.reply(
        messages.orderCreated,
        keyboards.removeKeyboard
      );
      await ctx.telegram.deleteMessage(chatId, updateMessageId);

      return await ctx.scene.leave();
    } else {
      await ctx.reply(messages.orderPhoneNumberInvalid);
    }
  },
);

module.exports = {
  createNewOrderScene
};