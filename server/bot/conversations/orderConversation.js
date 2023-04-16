import {calculateDistance, orderCardMessage} from '../utils.js';
import {getOrder, updateOrder} from '../../services/airtable.js';
import {orderShopKeyboard, orderUserKeyboard, shareAddressKeyboard, sharePhoneKeyboard} from '../keyboards.js';
import {t} from '../i18n.js';
import {getDistance} from '../../services/maps.js';
import {createIncomingOrder} from '../../services/posterPos.ts';

async function orderConversation(conversation, ctx) {
  const {
    message_id: userMessageId,
    chat: {id: chatId}, text: userMessageText
  } = ctx.update.message;

  let addressTitleMessage, addressUserMessage;

  console.log('context', ctx);

  const orderId = userMessageText.replace('order-', '');
  const order = await conversation.external(async () => await getOrder(orderId));

  await ctx.api.deleteMessage(chatId, userMessageId);

  ctx.session.newOrder = {
    ...order,
    username: ctx.message.from.username ? ctx.message.from.username : undefined,
    telegram: {
      userChat: chatId.toString()
    }
  };

  const {message_id: orderMessage} = await ctx.reply(orderCardMessage(ctx.session.newOrder, ctx));

  do {
    const {message_id: addressTitleMessageId} =
      await ctx.reply(t('messageAddAddress', ctx.session.language), {
        reply_markup: shareAddressKeyboard(ctx)
      });

    ctx = await conversation.wait();

    addressTitleMessage = addressTitleMessageId;
    addressUserMessage = ctx.message.message_id;
  } while (!ctx.message?.location);

  const distance = await getDistance({
    latitude: '6.011759',
    longitude: '80.248796',
  }, ctx.message.location);

  const deliveryPrice = calculateDistance(distance);

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
  await ctx.api.deleteMessage(chatId, addressTitleMessage);
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

  if(ctx.session.newOrder.shop.posterPos.id) {
    try {
      const posterOrder = await conversation.external(async () => await createIncomingOrder(ctx.session.newOrder));

      ctx.session.newOrder = {
        ...ctx.session.newOrder,
        posterId: posterOrder.id
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (ctx.session.newOrder.shop.adminGroup) {
    const {message_id: shopOrderMessage} =
      await ctx.api.sendMessage(order.shop.adminGroup, orderCardMessage(ctx.session.newOrder, ctx, 'shop'), {
        reply_markup: orderShopKeyboard(ctx, orderId)
      })

    const location = ctx.session.newOrder.address.split(', ');
    const {message_id: shopAddressMessage} = await ctx.api.sendLocation(order.shop.adminGroup, location[0], location[1]);

    ctx.session.newOrder = {
      ...ctx.session.newOrder,
      telegram: {
        ...ctx.session.newOrder.telegram,
        shopOrderMessage,
        shopAddressMessage
      }
    }
  }

  try {
    await conversation.external(async () => await updateOrder(ctx.session.newOrder.id, ctx.session.newOrder));
  } catch (e) {
    console.log(e);
  }

}

export {
  orderConversation
};