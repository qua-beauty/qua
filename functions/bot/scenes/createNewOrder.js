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

    const {message_id: phoneMessageId} = await ctx.reply(
      messages.auth,
      keyboards.auth
    );

    ctx.scene.state = {
      orderMessageId,
      phoneMessageId,
      order,
      telegram: {
        chatId
      }
    };

    return ctx.wizard.next();
  },
  async (ctx) => {
    const {message_id: userLocationMessageId, text, contact} = ctx.update.message;

    if (contact) {
      ctx.scene.state.newOrderFields = {phoneNumber: contact.phone_number, name: contact.first_name};
    } else if (text.match(masks.phoneNumber)) {
      ctx.scene.state.newOrderFields = {phoneNumber: text};
    } else {
      const {message_id: orderPhoneInvalidMessageId} = await ctx.reply(messages.authInvalid);
      ctx.scene.state.orderPhoneInvalidMessageId = orderPhoneInvalidMessageId;
    }

    // Ask user about delivery address
    const {message_id: locationMessageId} = await ctx.reply(
      messages.saveAddress(ctx.scene.state.newOrderFields.name),
      keyboards.saveAddress
    );

    ctx.scene.state = {
      ...ctx.scene.state,
      locationMessageId,
      userLocationMessageId
    };

    await updateOrder(ctx.scene.state.order.id, {
      ...ctx.scene.state.newOrderFields,
      telegram: ctx.scene.state.telegram
    });

    return ctx.wizard.next();

  },
  async (ctx) => {
    const {message_id: userPhoneMessageId, text, location} = ctx.update.message;

    if (location) {
      ctx.scene.state.newOrderFields.location = location;
    } else {
      ctx.scene.state.newOrderFields.locationAddress = text;
    }

    ctx.scene.state.userPhoneMessageId = userPhoneMessageId;
    ctx.scene.state.newOrderFields.status = 'preorder';

    clearMessages(ctx);

    console.log(ctx.scene.state);

    const {message_id: orderMessageId} = await ctx.reply(messages.orderCard({
      ...ctx.scene.state.order,
      ...ctx.scene.state.newOrderFields
    }), {
      parse_mode: 'MarkdownV2'
    });

    await ctx.reply(messages.saveOrder);

    ctx.scene.state.telegram.userMessageId = orderMessageId;

    if (ctx.scene.state.order.shopGroupId) {
      await ctx.telegram.sendMessage(ctx.scene.state.order.shopGroupId, messages.orderCard({
        ...ctx.scene.state.order,
        ...ctx.scene.state.newOrderFields
      }, 'shop'), {
        parse_mode: 'MarkdownV2',
        ...keyboards.orderShopActions(ctx.scene.state.order.id)
      });
    }

    if (ctx.scene.state.order.deliveryGroupId) {
      await ctx.telegram.sendMessage(ctx.scene.state.order.deliveryGroupId, messages.orderCard({
        ...ctx.scene.state.order,
        ...ctx.scene.state.newOrderFields
      }, 'delivery'), {
        parse_mode: 'MarkdownV2',
        ...keyboards.orderDeliveryActions(ctx.scene.state.order.id)
      });
    }

    ctx.scene.state = {
      ...ctx.scene.state,
      orderMessageId
    };

    await updateOrder(ctx.scene.state.order.id, {
      ...ctx.scene.state.newOrderFields,
      telegram: ctx.scene.state.telegram
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