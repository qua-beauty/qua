import {masks, parseMode} from '../utils.js';
import {getOrder, updateOrder} from '../services.js';
import {messages} from '../messages.js';
import {orderShopKeyboard, orderUserKeyboard, shareAddressKeyboard, sharePhoneKeyboard} from '../keyboards.js';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  let phoneTitleMessage, addressTitleMessage, phoneUserMessage, addressUserMessage;

  console.log('context', ctx);

  // if(masks.order.test(userMessageText)) {
  //   return await ctx.conversation.reenter('newOrder');
  // }

  const orderId = userMessageText.replace('order-', '');
  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  await ctx.reply(messages.orderCard(order), parseMode);

  ctx.session.newOrder = {
    ...order,
    telegram: {
      userChat: chatId.toString()
    }
  };

  do {
    const {message_id: phoneTitleMessageId} = await ctx.reply(messages.auth, {reply_markup: sharePhoneKeyboard});
    ctx = await conversation.wait();

    phoneTitleMessage = phoneTitleMessageId;
    phoneUserMessage = ctx.message.message_id;

    console.log('phone', ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply('Cancelled, leaving!');
      return;
    }
  } while (!(ctx.message?.contact || ctx.message?.text.match(masks.phone)));


  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    phone: ctx.message.contact ? ctx.message.contact.phone_number : phoneTitleMessageText
  };

  do {
    const {message_id: addressTitleMessageId} = await ctx.reply(messages.saveAddress(ctx.session.newOrder.user), {
      reply_markup: shareAddressKeyboard
    });

    ctx = await conversation.wait();

    addressTitleMessage = addressTitleMessageId;
    addressUserMessage = ctx.message.message_id;

    console.log('location', ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply('Cancelled, leaving!');
      return;
    }
  } while (!ctx.message?.location);

  const {message_id: userOrderMessage} = await ctx.reply(messages.orderCard(ctx.session.newOrder), {
    ...parseMode,
    reply_markup: orderUserKeyboard(orderId)
  });

  await ctx.api.deleteMessage(chatId, phoneTitleMessage);
  await ctx.api.deleteMessage(chatId, addressTitleMessage);
  await ctx.api.deleteMessage(chatId, phoneUserMessage);
  await ctx.api.deleteMessage(chatId, addressUserMessage);

  const {message_id: userTitleMessage} = await ctx.reply(messages.saveOrder);

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    address: `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`,
    status: 'pending',
    telegram: {
      userChat: chatId,
      userOrderMessage,
      userTitleMessage
    },
  }

  await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, ctx.session.newOrder));

  if (order.shop.adminGroup) {
    await ctx.api.sendMessage(order.shop.adminGroup, messages.orderCard({
      ...ctx.session.newOrder
    }, 'shop'), {
      ...parseMode,
      reply_markup: orderShopKeyboard(orderId)
    })
  }

}

export {
  orderConversation
};