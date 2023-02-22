import {masks, parseMode} from '../utils.js';
import {getOrder, updateOrder} from '../services.js';
import {messages} from '../messages.js';
import {orderShopKeyboard, orderUserKeyboard, shareAddressKeyboard, sharePhoneKeyboard} from '../keyboards.js';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

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
    chatId: chatId.toString()
  };

  do {
    await ctx.reply(messages.auth, {reply_markup: sharePhoneKeyboard});
    ctx = await conversation.wait();

    console.log('phone', ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply('Cancelled, leaving!');
      return;
    }
  } while (!(ctx.message?.contact || ctx.message?.text.match(masks.phone)));


  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    phone: ctx.message.contact ? ctx.message.contact.phone_number : phoneMessageText
  };

  do {
    await ctx.reply(messages.saveAddress(ctx.session.newOrder.user), {
      reply_markup: shareAddressKeyboard
    });
    ctx = await conversation.wait();

    console.log('location', ctx);

    if (ctx.message?.text === '/cancel') {
      await ctx.reply('Cancelled, leaving!');
      return;
    }
  } while (!ctx.message?.location);

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    address: `${ctx.message.location.latitude}, ${ctx.message.location.longitude}`,
    status: 'moderate',
  }

  await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, ctx.session.newOrder));

  await ctx.reply(messages.orderCard(ctx.session.newOrder), {
    ...parseMode,
    reply_markup: orderUserKeyboard(orderId)
  });

  await ctx.reply(messages.saveOrder);

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