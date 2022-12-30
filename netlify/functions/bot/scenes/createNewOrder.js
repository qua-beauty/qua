const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const clearMessages = (ctx) => {
  const {
    orderMessageId,
    locationMessageId,
    phoneMessageId,
    userLocationMessageId,
    userPhoneMessageId,
    orderPhoneInvalidMessageId
  } = ctx.scene.state;

  if (orderMessageId) ctx.deleteMessage(orderMessageId);
  if (locationMessageId) ctx.deleteMessage(locationMessageId);
  if (phoneMessageId) ctx.deleteMessage(phoneMessageId);
  if (userLocationMessageId) ctx.deleteMessage(userLocationMessageId);
  if (userPhoneMessageId) ctx.deleteMessage(userPhoneMessageId);
  if (orderPhoneInvalidMessageId) ctx.deleteMessage(orderPhoneInvalidMessageId);
};

const createNewOrderScene = new Scenes.WizardScene(sceneNames.CREATE_NEW_ORDER,
  async (ctx) => {
    const {message_id: updateMessageId, chat: {id: chatId}, text} = ctx.update.message;
    const orderId = text.match(masks.order)[0].replace('#', '');
    const order = await getOrder(orderId);

    // Delete inline message from user
    await ctx.telegram.deleteMessage(chatId, updateMessageId);

    // Send Order Card
    const {message_id: orderMessageId} = await ctx.reply(messages.orderCard(order), {
      parse_mode: 'MarkdownV2'
    });

    // Ask user about delivery address
    const {message_id: locationMessageId} = await ctx.reply(
      messages.orderWhereToDelivery,
      keyboards.orderDeliveryAddress
    );

    ctx.scene.state = {
      orderMessageId,
      locationMessageId,
      order,
      telegram: {
        chatId
      }
    };

    return ctx.wizard.next();
  },
  async (ctx) => {
    const {message_id: userLocationMessageId, text, location} = ctx.update.message;

    if (location) {
      ctx.scene.state.newOrderFields = {location};
    } else {
      ctx.scene.state.newOrderFields = {locationAddress: text};
    }

    const {message_id: phoneMessageId} = await ctx.reply(
      messages.orderPhoneNumber,
      keyboards.orderPhoneNumber
    );

    ctx.scene.state = {
      ...ctx.scene.state,
      phoneMessageId,
      userLocationMessageId
    };

    return ctx.wizard.next();

  },
  async (ctx) => {
    const {message_id: userPhoneMessageId, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.newOrderFields.phoneNumber = contact.phone_number;
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.newOrderFields.phoneNumber = text;
    } else {
      const {message_id: orderPhoneInvalidMessageId} = await ctx.reply(messages.orderPhoneNumberInvalid);
      ctx.scene.state.orderPhoneInvalidMessageId = orderPhoneInvalidMessageId;
    }

    ctx.scene.state.userPhoneMessageId = userPhoneMessageId;
    ctx.scene.state.newOrderFields.status = 'moderate';

    clearMessages(ctx);

    await ctx.reply(messages.orderCreated);
    const {message_id: orderMessageId} = await ctx.reply(messages.orderCard({
      ...ctx.scene.state.order,
      ...ctx.scene.state.newOrderFields
    }), {
      parse_mode: 'MarkdownV2',
      ...keyboards.orderUserActions(ctx.scene.state.order.id)
    });

    ctx.scene.state.newOrderFields.telegram.userMessageId = orderMessageId;

    await updateOrder(ctx.scene.state.order.id, {
      ...ctx.scene.state.newOrderFields
    });

    return ctx.wizard.next();
  },
  (ctx) => {
    return ctx.scene.leave();
  }
);

module.exports = {
  createNewOrderScene
};