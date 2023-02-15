import {masks, parseMode} from '../utils.js';
import {getOrder, updateOrder} from '../services.js';
import {messages} from '../messages.js';
import {sharePhoneKeyboard, shareAddressKeyboard, orderUserKeyboard} from '../keyboards.js';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  const orderId = userMessageText.replace('order-', '');
  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  const {
    message_id: orderCardMessageId
  } = await ctx.reply(messages.orderCard(order), {
    ...parseMode
  });

  const {
    message_id: phoneMessageId
  } = await ctx.reply(
    messages.auth,
    {
      reply_markup: sharePhoneKeyboard
    }
  );

  ctx.session.newOrder = order;

  const phoneMessageContext = await conversation.wait();

  const {
    text: phoneMessageText,
    contact
  } = phoneMessageContext.message;

  // ctx.api.deleteMessage(chatId, phoneMessageId);

  if(contact || phoneMessageText.match(masks.phone)) {
    ctx.session.newOrder = {
      ...ctx.session.newOrder,
      phone: contact ? contact.phone_number : phoneMessageText
    }
  }

  const {message_id: locationMessageId} = await ctx.reply(
    messages.saveAddress(ctx.session.newOrder.user),
    {
      reply_markup: shareAddressKeyboard
    }
  );


  const addressMessageContext = await conversation.wait();

  const {
    text: addressMessageText,
    location
  } = addressMessageContext.message;

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    address: location ? `${location.latitude}, ${location.longitude}` : addressMessageText,
    status: 'pending',
  }

  await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, ctx.session.newOrder));

  await ctx.reply(messages.orderCard(ctx.session.newOrder), {
    ...parseMode,
    reply_markup: orderUserKeyboard(orderId)
  });

  await ctx.reply(messages.saveOrder);
}

export {
  orderConversation
};