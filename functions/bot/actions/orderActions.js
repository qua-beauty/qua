const {updateOrder, getOrder} = require('../services.js');
const {messages} = require('../messages.js');
const {parseMode} = require('../utils.js');
const {keyboards} = require('../keyboards.js');

const updateOrderAction = async (ctx, status, isUser) => {
  console.log(ctx);
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);

  const newOrder = {
    ...order,
    status
  };

  const message = messages.orderCard(newOrder);
  await ctx.api.deleteMessage(chat.id, messageId);

  await ctx.reply(message, {
    ...parseMode
  });

  if(!isUser){
    const {chatId, userMessageId} = order.telegram;
    await ctx.api.deleteMessage(chatId, userMessageId);
    await ctx.api.sendMessage(chatId, message, parseMode);

    if(status === 'cooking') {
      await ctx.api.sendMessage(chatId, messages.approveOrder, parseMode);
    }

    if(status === 'cooked') {
      await ctx.api.sendMessage(chatId, messages.doneOrder, parseMode);
    }
  }

  await updateOrder(orderId, {status});
};

const cancelOrder = (ctx) => updateOrderAction(ctx, 'cancelled', true);
const shopDeclineOrder = (ctx) => updateOrderAction(ctx, 'declined');
const shopAcceptOrder = (ctx) => updateOrderAction(ctx, 'cooking');
const shopDoneOrder = (ctx) => updateOrderAction(ctx, 'cooked');
const deliveryAcceptOrder = (ctx) => updateOrderAction(ctx, 'delivery');

const backToHome = async (ctx) => {
  await ctx.reply(messages.start, keyboards.start);
};

module.exports = {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  backToHome,
  shopDoneOrder,
  deliveryAcceptOrder
};