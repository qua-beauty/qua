import {calculateDistance, masks, orderCardMessage} from '../utils.js';
import {getOrder, updateOrder} from '../services/airtable.js';
import {orderShopKeyboard, orderUserKeyboard, sharePhoneKeyboard} from '../keyboards.js';
import {t} from '../i18n.js';
import {getDistance} from '../services/googleMaps.js';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  let phoneTitleMessage, addressTitleMessage, phoneUserMessage, addressUserMessage;

  console.log('context', ctx);

  const orderId = userMessageText.replace('order-', '');
  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  ctx.session.newOrder = {
    ...order,
    telegram: {
      userChat: chatId.toString()
    }
  };

  const {message_id: orderMessage} = await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx));

  do {
    const {message_id: phoneTitleMessageId} = await ctx.reply(t('messageAddPhone', ctx.session.language),
      {reply_markup: sharePhoneKeyboard(ctx)});
    ctx = await conversation.wait();

    phoneTitleMessage = phoneTitleMessageId;
    phoneUserMessage = ctx.message.message_id;
  } while (!(ctx.message?.contact || ctx.message?.text?.match(masks.phone)));

  ctx.session.newOrder = {
    ...ctx.session?.newOrder,
    phone: ctx.message.contact?.phone_number || ctx.message.text,
    username: ctx.message.from.username ? ctx.message.from.username : undefined
  };

  do {
    const {message_id: addressTitleMessageId} =
      await ctx.reply(t('messageAddAddress', ctx.session.language, {name: ctx.session.newOrder.user}));

    ctx = await conversation.wait();

    addressTitleMessage = addressTitleMessageId;
    addressUserMessage = ctx.message.message_id;
  } while (!ctx.message?.location);

  const distance = await getDistance({
    latitude: '6.009466',
    longitude: '80.250995',
  }, ctx.message.location);

  const deliveryPrice = calculateDistance(distance, ctx.session.newOrder.price);

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    address: Object.values(ctx.message.location).join(', '),
    distance,
    deliveryPrice,
    status: 'pending',
  }

  const {message_id: userOrderMessage} = await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx), {
    reply_markup: orderUserKeyboard(ctx, orderId)
  });

  await ctx.api.deleteMessage(chatId, orderMessage);
  await ctx.api.deleteMessage(chatId, phoneTitleMessage);
  await ctx.api.deleteMessage(chatId, addressTitleMessage);
  await ctx.api.deleteMessage(chatId, phoneUserMessage);
  await ctx.api.deleteMessage(chatId, addressUserMessage);

  const {message_id: userTitleMessage} = await ctx.reply(t('messageOrderPending', ctx.session.language));

  ctx.session.newOrder = {
    ...ctx.session.newOrder,
    telegram: {
      userChat: chatId,
      userOrderMessage,
      userTitleMessage,
    },
  }

  await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, ctx.session.newOrder));

  if (order.shop.adminGroup) {
    const {message_id: shopOrderMessage} =
      await ctx.api.sendMessage(order.shop.adminGroup, orderCardMessage(ctx.session.newOrder, ctx, 'shop'), {
      reply_markup: orderShopKeyboard(ctx, orderId)
    })

    const location = ctx.session.newOrder.address.split(', ');
    const {message_id: shopAddressMessage} = await ctx.api.sendLocation(order.shop.adminGroup, location[0], location[1]);

    await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, {
      ...ctx.session.newOrder,
      telegram: {
        ...ctx.session.newOrder.telegram,
        shopOrderMessage,
        shopAddressMessage
      }
    }));
  }

}

export {
  orderConversation
};