import {getOrder, updateOrder} from '../services.js';
import {orderCardMessage} from '../utils.js';
import {t} from '../i18n.js';
import {orderShopDeliveryKeyboard} from '../keyboards.js';

const shopAcceptOrder = async (ctx, status, isUser) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status
  };

  if (!isUser) {
    await ctx.api.deleteMessage(chat.id, messageId);
    await ctx.api.deleteMessage(chat.id, shopAddressMessage);
  }

  await ctx.api.deleteMessage(userChat, userOrderMessage);
  await ctx.api.deleteMessage(userChat, userTitleMessage);


  await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx), {
    reply_markup: orderShopDeliveryKeyboard(ctx, orderId)
  });

  const location = ctx.session.newOrder.address.split(', ');
  let {message_id: newShopAddressMessage} = await ctx.replyWithLocation(location[0], location[1]);

  if (!isUser) {
    let {message_id: userOrderMessageNew} = await ctx.api.sendMessage(userChat,
      orderCardMessage(ctx.session.newOrder, ctx));
    let {message_id: userTitleMessageNew} = await ctx.api.sendMessage(userChat,
      t('messageOrderCooking', ctx.session.language));

    ctx.session.newOrder = {
      ...ctx.session.newOrder,
      telegram: {
        ...order.telegram,
        userOrderMessage: userOrderMessageNew,
        userTitleMessage: userTitleMessageNew,
        shopAddressMessage: newShopAddressMessage
      }
    };
  }

  await updateOrder(orderId, ctx.session.newOrder);
};

export default shopAcceptOrder;