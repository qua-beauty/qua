import {getOrder, updateOrder} from '../services.js';
import {orderCardMessage} from '../utils.js';
import {orderShopDeliveryKeyboard, orderShopDoneKeyboard, startKeyboard} from '../keyboards.js';
import {i18n} from '../i18n.js';

const updateOrderAction = async (ctx, status, isUser) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status
  };

  if(!isUser) {
    await ctx.api.deleteMessage(chat.id, messageId);
    await ctx.api.deleteMessage(chat.id, shopAddressMessage);
  }

  await ctx.api.deleteMessage(userChat, userOrderMessage);
  await ctx.api.deleteMessage(userChat, userTitleMessage);

  if(status === 'cancelled') {
    await ctx.reply(orderCardMessage(ctx.session.newOrder));

    await ctx.api.deleteMessage(order.shop.adminGroup, shopOrderMessage);
    await ctx.api.sendMessage(order.shop.adminGroup, orderCardMessage(ctx.session.newOrder));
  }

  if(status === 'declined') {
    await ctx.reply(orderCardMessage(ctx.session.newOrder));
    const location = ctx.session.newOrder.address.split(', ');
    let {message_id: shopAddressMessage} = await ctx.replyWithLocation(location[0], location[1]);

    if(!isUser) {
      let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat, orderCardMessage(ctx.session.newOrder));
      let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat, i18n.t('messageOrderDecline'));

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        telegram: {
          ...order.telegram,
          userOrderMessage: userOrderMessageNew,
          userTitleMessage: userTitleMessageNew,
          shopAddressMessage
        }
      }
    }
  }

  if(status === 'cook') {
    await ctx.reply(orderCardMessage(ctx.session.newOrder), {
      reply_markup: orderShopDeliveryKeyboard(orderId)
    });

    const location = ctx.session.newOrder.address.split(', ');
    let {message_id: shopAddressMessage} = await ctx.replyWithLocation(location[0], location[1]);

    if(!isUser) {
      let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat, orderCardMessage(ctx.session.newOrder));
      let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat, i18n.t('messageOrderCooking'));

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        telegram: {
          ...order.telegram,
          userOrderMessage: userOrderMessageNew,
          userTitleMessage: userTitleMessageNew,
          shopAddressMessage
        }
      }
    }
  }

  if(status === 'delivery') {
    await ctx.reply(orderCardMessage(ctx.session.newOrder), {
      reply_markup: orderShopDoneKeyboard(orderId)
    });

    const location = ctx.session.newOrder.address.split(', ');
    let {message_id: shopAddressMessage} = await ctx.replyWithLocation(location[0], location[1]);

    if(!isUser) {
      let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat, orderCardMessage(ctx.session.newOrder));
      let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat, i18n.t('messageOrderDelivering'));

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        telegram: {
          ...order.telegram,
          userOrderMessage: userOrderMessageNew,
          userTitleMessage: userTitleMessageNew,
          shopAddressMessage
        }
      }
    }
  }

  if(status === 'complete') {
    await ctx.reply(orderCardMessage(ctx.session.newOrder));

    if (!isUser) {
      await ctx.api.sendMessage(userChat, orderCardMessage(ctx.session.newOrder));
      await ctx.api.sendMessage(userChat, i18n.t('messageOrderComplete'));
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
  await ctx.reply(i18n.t('messageStart'), startKeyboard);
};

export {
  cancelOrder,
  shopDeclineOrder,
  shopAcceptOrder,
  backToHome,
  shopDeliveryOrder,
  shopDoneOrder
};