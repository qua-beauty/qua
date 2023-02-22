import {getOrder, updateOrder} from '../services.js';
import {messages} from '../messages.js';
import {parseMode} from '../utils.js';
import {orderShopDeliveryKeyboard, orderShopDoneKeyboard, startKeyboard} from '../keyboards.js';

const updateOrderAction = async (ctx, status, isUser) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status
  };

  await ctx.api.deleteMessage(chat.id, messageId);
  await ctx.api.deleteMessage(userChat, userOrderMessage);
  await ctx.api.deleteMessage(userChat, userTitleMessage);

  if(status === 'cook') {
    await ctx.reply(messages.orderCard(ctx.session.newOrder), {
      ...parseMode,
      reply_markup: orderShopDeliveryKeyboard(orderId)
    });

    if(!isUser) {
      let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat, messages.orderCard(ctx.session.newOrder),
        parseMode);
      let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat, messages.cookOrder);

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        telegram: {
          ...order.telegram,
          userOrderMessage: userOrderMessageNew,
          userTitleMessage: userTitleMessageNew,
        }
      }
    }
  }

  if(status === 'delivery') {
    await ctx.reply(messages.orderCard(ctx.session.newOrder), {
      ...parseMode,
      reply_markup: orderShopDoneKeyboard(orderId)
    });

    if(!isUser) {
      let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat, messages.orderCard(ctx.session.newOrder),
        parseMode);
      let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat, messages.deliveryOrder);

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        telegram: {
          ...order.telegram,
          userOrderMessage: userOrderMessageNew,
          userTitleMessage: userTitleMessageNew,
        }
      }
    }
  }

  if(status === 'complete') {
    await ctx.reply(messages.orderCard(ctx.session.newOrder), {
      ...parseMode
    });

    if (!isUser) {
      await ctx.api.sendMessage(userChat, messages.orderCard(ctx.session.newOrder), parseMode);
      await ctx.api.sendMessage(userChat, messages.doneOrder);
    }
  }

  await updateOrder(orderId, ctx.session.newOrder);
};

const cancelOrder = (ctx) => updateOrderAction(ctx, 'cancelled', true);
const shopDeclineOrder = (ctx) => updateOrderAction(ctx, 'declined');
const shopAcceptOrder = (ctx) => updateOrderAction(ctx, 'cook');
const shopDeliveryOrder = (ctx) => updateOrderAction(ctx, 'delivery');
const shopDoneOrder = (ctx) => updateOrderAction(ctx, 'complete');

const backToHome = async (ctx) => {
  await ctx.reply(messages.start, startKeyboard);
};

export {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  backToHome,
  shopDeliveryOrder,
  shopDoneOrder
};