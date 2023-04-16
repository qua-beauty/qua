import {getOrder, updateOrder} from '../services/airtable.js';
import {orderCardMessage} from '../utils.js';
import {t} from '../i18n.js';

const shopDoneOrder = async (ctx) => {
  const {message: {message_id: messageId, chat}, data} = ctx.update.callback_query;

  const orderId = data.split(' ')[1];
  const order = await getOrder(orderId);
  const {userChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;

  ctx.session.newOrder = {
    ...order,
    status: 'complete'
  };

  try {
    await ctx.api.deleteMessage(chat.id, messageId);
    await ctx.api.deleteMessage(chat.id, shopAddressMessage);
    await ctx.api.deleteMessage(userChat, userOrderMessage);
    await ctx.api.deleteMessage(userChat, userTitleMessage);
  } catch (e) {
    console.log(e);
  }

  await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx));

  await ctx.api.sendMessage(userChat, orderCardMessage(ctx.session.newOrder, ctx));
  await ctx.api.sendMessage(userChat, t('messageOrderComplete', ctx.session.language));

  await updateOrder(orderId, ctx.session.newOrder);
};

export default shopDoneOrder;