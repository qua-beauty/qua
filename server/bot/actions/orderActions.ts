import {getOrder, updateOrder} from '../../services/airtable.js';
import {orderCardMessage, statusByAction, statuses} from '../utils.js';
import {bot} from '../bot.js';
import {t} from "../i18n.js";
import {orderCompleteKeyboard, orderCookKeyboard, orderDeliveryKeyboard} from "../keyboards.js";
import {updateIncomingOrder} from "../../services/posterPos.ts";

const getMessageData = (order) => {
  switch (order.status) {
    case 'cook':
      return {
        message: t('messageOrderCooking'),
        shopKeyboard: {reply_markup: orderCookKeyboard(order.id)},
        deliveryKeyboard: null
      };
    case 'cooked':
      return {
        message: t('messageOrderCooked'),
        shopKeyboard: null,
        deliveryKeyboard: {reply_markup: orderDeliveryKeyboard(order.id)},
      };
    case 'delivery':
      return {
        message: t('messageOrderDelivery'),
        shopKeyboard: null,
        deliveryKeyboard: {reply_markup: orderCompleteKeyboard(order.id)}
      }
    case 'complete':
      return {
        message: t('messageOrderComplete'),
        shopKeyboard: null,
        deliveryKeyboard: null
      }
    case 'declined':
      return {
        message: t('messageOrderDeclined'),
        shopKeyboard: null,
        deliveryKeyboard: null
      }
    case 'cancelled':
      return {
        message: t('messageOrderCancelled'),
        shopKeyboard: null,
        deliveryKeyboard: null
      }
  }
}

export const updateOrderAction = async (order) => {
  if(order.status === statuses.CLOSED) return; // Don't do anything if status CLOSED

  const orderId = order.id;
  const location = order.address.split(', ');
  const messageData = getMessageData(order);
  const deliveryChat: number = -1001927483990 //TODO: REMOVE IT FROM HERE
  const {
    userChat,
    adminChat,
    userOrderMessage,
    userTitleMessage,
    shopOrderMessage,
    shopAddressMessage
  } = order.telegram;

  try {
    if (shopOrderMessage) await bot.api.deleteMessage(adminChat, shopOrderMessage);
    if (shopAddressMessage) await bot.api.deleteMessage(adminChat, shopAddressMessage);
    if (userOrderMessage) await bot.api.deleteMessage(userChat, userOrderMessage);
    if (userTitleMessage) await bot.api.deleteMessage(userChat, userTitleMessage);
    if (deliveryOrderMessage) await bot.api.deleteMessage(deliveryChat, deliveryOrderMessage);
    if (deliveryAddressMessage) await bot.api.deleteMessage(deliveryChat, deliveryAddressMessage);
  } catch (error) {
    console.error(error);
  }

  const {message_id: shopOrderMessage} = await bot.api.sendMessage(order.telegram.adminChat, orderCardMessage(order), messageData.shopKeyboard);
  const {message_id: shopAddressMessage} = await bot.api.sendLocation(order.telegram.adminChat, location[0], location[1]);

  const {message_id: userOrderMessage} = await bot.api.sendMessage(order.telegram.userChat, orderCardMessage(order));
  const {message_id: userTitleMessage} = await bot.api.sendMessage(order.telegram.userChat, messageData.message);

  const {message_id: deliveryOrderMessage} = await bot.api.sendMessage(order.telegram.deliveryChat, orderCardMessage(order), messageData.deliveryKeyboard);
  const {message_id: deliveryAddressMessage} = await bot.api.sendLocation(order.telegram.deliveryChat, location[0], location[1]);

  await updateOrder(orderId, {
    ...order,
    telegram: {
      ...order.telegram,
      status: order.status,
      shopOrderMessage,
      shopAddressMessage,
      userOrderMessage,
      userTitleMessage,
      deliveryOrderMessage,
      deliveryAddressMessage
    }
  });

  if(order.status === statuses.DELIVERY || order.status === statuses.COMPLETE) {
    await updateIncomingOrder(order);
  }
};

export const orderAction = async (ctx) => {
  const action = ctx.update.callback_query.data.split(' ')[0];
  const orderId = ctx.update.callback_query.data.split(' ')[1];
  const order = await getOrder(orderId);
  const status = statusByAction[action];

  await updateOrderAction({
    ...order,
    status,
  })
}