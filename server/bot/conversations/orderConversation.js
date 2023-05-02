import {calculateDistance, statuses} from '../utils.js';
import {defaultOrderTemplate} from '../templates.js';
import {getOrder} from '../../services/airtable.js';
import {shareAddressKeyboard} from '../keyboards.js';
import {t} from '../i18n.js';
import {getDistance} from '../../services/maps.js';
import {updateOrderAction} from '../actions/orderActions.ts';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  let addressTitleMessage, addressUserMessage;
  let orderId;

  if(userMessageText.indexOf('/start') >= 0) {
    orderId = userMessageText.replace('/start order-', '');
  } else {
    orderId = userMessageText.replace('order-', '');
  }

  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  ctx.session.newOrder = {
    ...order,
    username: ctx.message.from.username ? ctx.message.from.username : undefined,
  };

  const {message_id: orderMessage} = await ctx.reply(defaultOrderTemplate(ctx.session.newOrder));

  do {
    const {message_id: addressTitleMessageId} =
      await ctx.reply(t('messageAddAddress'), {
        reply_markup: shareAddressKeyboard()
      });

    ctx = await conversation.wait();

    console.log(ctx);

    addressTitleMessage = addressTitleMessageId;
    addressUserMessage = ctx.message.message_id;

    if (ctx.message?.text === '/cancel') {
      await ctx.reply('Cancelled, leaving!');
      return;
    }
  } while (!ctx.message?.location);

  const distance = await getDistance({
    latitude: '6.011759',
    longitude: '80.248796',
  }, ctx.message.location);

  const deliveryPrice = calculateDistance(distance);

  await ctx.api.deleteMessage(chatId, orderMessage);
  await ctx.api.deleteMessage(chatId, addressTitleMessage);
  await ctx.api.deleteMessage(chatId, addressUserMessage);

  await updateOrderAction({
    ...ctx.session.newOrder,
    address: Object.values(ctx.message.location).join(', '),
    distance,
    deliveryPrice,
    status: statuses.PENDING,
  })
}

export {
  orderConversation
};