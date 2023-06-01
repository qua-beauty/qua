import {statuses} from '../utils.js';
import {getOrder} from '../../services/airtable.js';
import {updateOrderAction} from '../actions/orderActions.ts';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  let orderId;

  if(userMessageText.indexOf('/start') >= 0) {
    orderId = userMessageText.replace('/start order-', '');
  } else {
    orderId = userMessageText.replace('order-', '');
  }

  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  await updateOrderAction({
    ...order,
    status: statuses.PENDING
  })
}

export {
  orderConversation
};