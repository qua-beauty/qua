const {Scenes} = require('telegraf');
const {getOrder, updateOrder} = require('../services.js');
const {masks} = require('../utils.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');
const {keyboards} = require('../keyboards.js');

const checkForLeave = (ctx, text) => {
  if (text && text.match(masks.order)) {
    return ctx.scene.leave();
  }
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
      order
    };

    return ctx.wizard.next();
  },
  async (ctx) => {
    checkForLeave();

    const {message_id: userLocationMessageId, text, location} = ctx.update.message;

    const {message_id: phoneMessageId} = await ctx.reply(
      messages.orderPhoneNumber,
      keyboards.orderPhoneNumber
    );

    ctx.scene.state = {
      ...ctx.scene.state,
      phoneMessageId,
      userLocationMessageId,
      location: location ? location : text
    };
    return ctx.wizard.next();

  },
  async (ctx) => {
    checkForLeave();

    const {message_id: userPhoneMessageId, chat: {id: chatId}, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.phoneNumber = contact.phone_number;
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.phoneNumber = text;
    } else {
      return await ctx.reply(messages.orderPhoneNumberInvalid);
    }

    const newOrderProps = {
      location: ctx.scene.state.location,
      phoneNumber: ctx.scene.state.phoneNumber,
      status: 'moderate'
    };

    await updateOrder(ctx.scene.state.order.id, newOrderProps);

    await ctx.deleteMessage(ctx.scene.state.orderMessageId);
    await ctx.deleteMessage(ctx.scene.state.locationMessageId);
    await ctx.deleteMessage(ctx.scene.state.phoneMessageId);
    await ctx.deleteMessage(ctx.scene.state.userLocationMessageId);
    await ctx.deleteMessage(userPhoneMessageId);

    await ctx.reply(messages.orderCreated);
    await ctx.reply(messages.orderCard({
      ...ctx.wizard.state.order,
      ...newOrderProps
    }), {
      parse_mode: 'MarkdownV2'
    });

    return await ctx.scene.leave();
  },
);

module.exports = {
  createNewOrderScene
};