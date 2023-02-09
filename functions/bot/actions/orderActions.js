const functions = require('firebase-functions');
const {updateOrder, getOrder} = require('../services.js');
const {messages} = require('../messages.js');
const {parseMode} = require('../utils.js');
const {keyboards} = require('../keyboards.js');

const updateOrderAction = async (ctx, status, isUser) => {
  const orderId = ctx.callbackQuery.data.split(' ')[1];
  const order = await getOrder(orderId);

  functions.logger.log('context', ctx);

  const newOrder = {
    ...order,
    status
  };

  const message = messages.orderCard(newOrder);

  await updateOrder(orderId, {status});
  await ctx.editMessageText(message, parseMode);

  if(!isUser){
    const {chatId, userMessageId} = order.telegram;
    ctx.telegram.deleteMessage(userMessageId);
    await ctx.telegram.sendMessage(chatId, message, parseMode);
  }
};

const cancelOrder = (ctx) => updateOrderAction(ctx, 'cancelled', true);
const shopDeclineOrder = (ctx) => updateOrderAction(ctx, 'declined');
const shopAcceptOrder = (ctx) => updateOrderAction(ctx, 'cooking');

const backToHome = async (ctx) => {
  await ctx.reply(messages.start, keyboards.start);
};

module.exports = {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  backToHome
};