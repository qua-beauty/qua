const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {
    const {message_id:messageId, text, chat: {id:chatId}} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    ctx.scene.state.orderId = orderId;

    await ctx.telegram.deleteMessage(chatId, messageId);
    await ctx.reply(messages.orderDraftCreated(order), {
      parse_mode: 'MarkdownV2'
    });

    await ctx.reply(messages.orderWhereToDelivery, keyboards.orderDeliveryAddress);

    return ctx.wizard.next();
  },
  async (ctx) => {
    const {location, text} = ctx.update.message;
    ctx.scene.state.location = location ? location : text;
    await ctx.reply(messages.orderPhoneNumber, keyboards.orderPhoneNumber);

    return ctx.wizard.next();

  },
  async (ctx) => {
    const {contact, text} = ctx.update.message;

    if(contact) {
      ctx.scene.state.phoneNumber = contact.phone_number;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.reply(messages.orderCreated, keyboards.removeKeyboard);

      return await ctx.scene.leave();
    } else if(text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;

      await updateOrder(ctx.wizard.state.orderId, {
        location: ctx.wizard.state.location,
        phoneNumber: ctx.wizard.state.phoneNumber
      });

      await ctx.reply(messages.orderCreated, keyboards.removeKeyboard);

      return await ctx.scene.leave();
    } else {
      await ctx.reply(messages.orderPhoneNumberInvalid);
    }
  },
);

module.exports = {
  createNewOrderScene
};