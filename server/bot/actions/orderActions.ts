import {getOrder, updateOrder} from '../../services/airtable.js';
import {deliveryTypes, statusByAction, statuses} from '../utils.js';
import {defaultOrderTemplate} from '../templates.js';
import {bot} from '../bot.js';
import {t} from "../i18n.js";
import {
  orderCloseKeyboard,
  orderCompleteKeyboard,
  orderCookedKeyboard,
  orderDeliveryKeyboard, orderPickupCookedKeyboard, orderScheduleKeyboard,
  orderShopKeyboard,
  orderUserKeyboard
} from "../keyboards.js";

const getMessageData = (order) => {
  switch (order.status) {
    case statuses.PENDING:
      return {
        message: t('messageOrderPending'),
        shopKeyboard: {reply_markup: orderShopKeyboard(order.id)},
        deliveryKeyboard: null,
        userKeyboard: {reply_markup: orderUserKeyboard(order.id)}
      };
    case statuses.ACCEPTED:
      return {
        message: t('messageOrderAccept'),
        shopKeyboard: {reply_markup: orderScheduleKeyboard(order.id)},
        deliveryKeyboard: null,
        userKeyboard: null
      };

    case statuses.SCHEDULED:
      return {
        message: t('messageOrderSchedule'),
        shopKeyboard: {reply_markup: orderCompleteKeyboard(order.id)},
        deliveryKeyboard: null,
        userKeyboard: null
      }
    case statuses.COMPLETED:
      return {
        message: t('messageOrderComplete'),
        shopKeyboard: {reply_markup: orderCloseKeyboard(order.id)},
        deliveryKeyboard: {reply_markup: orderCloseKeyboard(order.id, 'si')},
        userKeyboard: null
      }
    case statuses.CLOSED:
      return {
        message: t('messageOrderClosed'),
        shopKeyboard: null,
        deliveryKeyboard: null,
        userKeyboard: null
      }
    case statuses.DECLINED:
      return {
        message: t('messageOrderDeclined'),
        shopKeyboard: null,
        deliveryKeyboard: null,
        userKeyboard: null
      }
    case statuses.CANCELLED:
      return {
        message: t('messageOrderCancelled'),
        shopKeyboard: null,
        deliveryKeyboard: null,
        userKeyboard: null
      }
  }
}

export const updateOrderAction = async (order) => {
  const orderId = order.id;
  const messageData = getMessageData(order);
  const {shopChat, userChat} = order;

  if (order.status !== statuses.PENDING) {
    try {
      if (order?.telegram?.shopOrderMessage) await bot.api.deleteMessage(shopChat, order.telegram.shopOrderMessage);
    } catch (error) {
      console.error(error);
    }

    try {
      if (order?.telegram?.userOrderMessage) await bot.api.deleteMessage(userChat, order.telegram.userOrderMessage);
    } catch (error) {
      console.error(error);
    }

    try {
      if (order?.telegram?.userTitleMessage) await bot.api.deleteMessage(userChat, order.telegram.userTitleMessage);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(order);
  const {message_id: shopOrderMessageNew} = await bot.api.sendMessage(order.shopTelegramId, defaultOrderTemplate(order), messageData.shopKeyboard);

  const {message_id: userOrderMessageNew} = await bot.api.sendMessage(userChat, defaultOrderTemplate(order), messageData.userKeyboard);
  const {message_id: userTitleMessageNew} = await bot.api.sendMessage(userChat, messageData.message);

  let telegram = {
    userOrderMessage: userOrderMessageNew,
    userTitleMessage: userTitleMessageNew,
    shopOrderMessage: shopOrderMessageNew
  };

  let orderData = {
    ...order,
    telegram: {
      ...order.telegram,
      ...telegram,
      status: order.status,
    }
  }

  await updateOrder(orderId, orderData);
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