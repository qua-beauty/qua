import {updateOrder, getOrder} from '../services.js';
import {messages} from '../messages.js';
import {parseMode} from '../utils.js';
import {orderShopDeliveryKeyboard, orderShopDoneKeyboard, startKeyboard} from '../keyboards.js';

const updateOrderAction = async (ctx, status, isUser) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);

  const newOrder = {
    ...order,
    status
  };

  await ctx.api.deleteMessage(chat.id, messageId);

  if(status === 'cook') {
    await ctx.reply(messages.orderCard(newOrder), {
      ...parseMode,
      reply_markup: orderShopDeliveryKeyboard(orderId)
    });

    if(!isUser){
      const {chatId} = order;
      await ctx.api.sendMessage(chatId, messages.orderCard(newOrder), parseMode);
      await ctx.api.sendMessage(chatId, messages.cookOrder);
    }
  }

  if(status === 'delivery') {
    await ctx.reply(messages.orderCard(newOrder), {
      ...parseMode,
      reply_markup: orderShopDoneKeyboard(orderId)
    });

    if(!isUser){
      const {chatId} = order;
      await ctx.api.sendMessage(chatId, messages.orderCard(newOrder), parseMode);
      await ctx.api.sendMessage(chatId, messages.deliveryOrder);
    }
  }

  if(status === 'complete') {
    await ctx.reply(messages.orderCard(newOrder), {
      ...parseMode
    });

    if(!isUser){
      const {chatId} = order;
      await ctx.api.sendMessage(chatId, messages.orderCard(newOrder), parseMode);
      await ctx.api.sendMessage(chatId, messages.doneOrder);
    }
  }

  await updateOrder(orderId, {status});
};

const cancelOrder = (ctx) => updateOrderAction(ctx, 'cancelled', true);
const shopDeclineOrder = (ctx) => updateOrderAction(ctx, 'declined');
const shopAcceptOrder = (ctx) => updateOrderAction(ctx, 'cook');
const shopDeliveryOrder = (ctx) => updateOrderAction(ctx, 'delivery');
const shopDoneOrder = (ctx) => updateOrderAction(ctx, 'complete');
const deliveryAcceptOrder = (ctx) => updateOrderAction(ctx, 'delivery');

const backToHome = async (ctx) => {
  await ctx.reply(messages.start, startKeyboard);
};

export {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  backToHome,
  shopDeliveryOrder,
  deliveryAcceptOrder,
  shopDoneOrder
};