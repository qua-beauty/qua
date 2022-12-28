const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {
    const {message_id: updateMessageId, text, chat: {id: chatId}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    await ctx.telegram.deleteMessage(chatId, updateMessageId);

    const order = await getOrder(orderId);
    await ctx.reply(messages.orderDraftCreated(order), {
      parse_mode: 'MarkdownV2'
    });

    const {message_id: messageId} = await ctx.reply(
      messages.orderWhereToDelivery,
      keyboards.orderDeliveryAddress
    );

    ctx.scene.state.orderId = orderId;
    ctx.scene.state.messageId = messageId;

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {

    } catch (e) {
      console.log(e.message);
    }

    const {message_id: updateMessageId, chat: {id: chatId}, text, location} = ctx.update.message;

    await ctx.telegram.deleteMessage(chatId, updateMessageId);
    await ctx.telegram.editMessageText(
      chatId, ctx.wizard.state.messageId,
      undefined,
      messages.orderPhoneNumber,
      keyboards.orderPhoneNumber
    );

    ctx.scene.state.location = location ? location : text;
    ctx.scene.state.messageId = messageId;

    return ctx.wizard.next();

  },
  async (ctx) => {
    try {
      await ctx.deleteMessage(ctx.wizard.state.messageId);
    } catch (e) {
      console.log(e.message);
    }

    const {message_id: updateMessageId, chat: {id: chatId}, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.phoneNumber = contact.phone_number;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.telegram.deleteMessage(chatId, updateMessageId);
      await ctx.telegram.editMessageText(
        chatId,
        ctx.wizard.state.messageId,
        undefined,
        messages.orderCreated,
        keyboards.removeKeyboard
      );

      return await ctx.scene.leave();
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.telegram.deleteMessage(chatId, updateMessageId);
      await ctx.telegram.editMessageText(
        chatId,
        ctx.wizard.state.messageId,
        undefined,
        messages.orderCreated,
        keyboards.removeKeyboard
      );

      return await ctx.scene.leave();
    } else {
      await ctx.reply(messages.orderPhoneNumberInvalid);
    }
  },
);

module.exports = {
  createNewOrderScene
};