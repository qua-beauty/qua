import {getOrder, updateOrder} from '../services/airtable.js';
import {orderCardMessage} from '../utils.js';
import {t} from '../i18n.js';

const shopDeclineOrder = async (ctx) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage, shopAddressMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status: 'declined'
  };

  await ctx.api.deleteMessage(chat.id, messageId);
  await ctx.api.deleteMessage(chat.id, shopAddressMessage);
  await ctx.api.deleteMessage(userChat, userOrderMessage);
  await ctx.api.deleteMessage(userChat, userTitleMessage);

  await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx));
  const location = ctx.session.newOrder.address.split(', ');
  let {message_id: newShopAddressMessage} = await ctx.replyWithLocation(location[0], location[1]);

  let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat,
    orderCardMessage(ctx.session.newOrder, ctx));
  let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat,
    t('messageOrderDecline', ctx.session.language));

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    telegram: {
      ...order.telegram,
      userOrderMessage: userOrderMessageNew,
      userTitleMessage: userTitleMessageNew,
      shopAddressMessage: newShopAddressMessage
    }
  };

  await updateOrder(orderId, ctx.session.newOrder);
};

export default shopDeclineOrder;