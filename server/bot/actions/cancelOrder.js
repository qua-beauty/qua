import {getOrder, updateOrder} from '../services/airtable.js';
import {orderCardMessage} from '../utils.js';

const cancelOrder = async (ctx) => {
  const {data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status: 'cancelled'
  };

  await ctx.api.deleteMessage(userChat, userOrderMessage);
  await ctx.api.deleteMessage(userChat, userTitleMessage);

  await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx));

  await ctx.api.deleteMessage(order.shop.adminGroup, shopOrderMessage);
  await ctx.api.sendMessage(order.shop.adminGroup, orderCardMessage(ctx.session.newOrder, ctx));

  await updateOrder(orderId, ctx.session.newOrder);
};

export default cancelOrder;