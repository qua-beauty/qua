import {getOrder, updateOrder} from '../../services/airtable.js';
import {deliveryTypes, statusByAction, statuses} from '../utils.js';
import {defaultOrderTemplate, deliveryOrderTemplate} from '../templates.js';
import {bot} from '../bot.js';
import {t} from "../i18n.js";
import {
  orderCloseKeyboard,
  orderCompleteKeyboard,
  orderCookedKeyboard,
  orderDeliveryKeyboard, orderPickupCookedKeyboard,
  orderShopKeyboard,
  orderUserKeyboard
} from "../keyboards.js";
import {createIncomingOrder, updateIncomingOrder} from "../../services/posterPos.ts";

const getMessageData = (order) => {
  switch (order.status) {
    case statuses.PENDING:
      return {
        message: t('messageOrderPending'),
        shopKeyboard: {reply_markup: orderShopKeyboard(order.id)},
        deliveryKeyboard: null,
        userKeyboard: orderUserKeyboard(order.id)
      };
    case statuses.COOK:
      return {
        message: t('messageOrderCooking'),
        shopKeyboard: {reply_markup: order.type === deliveryTypes.DELIVERY ? orderCookedKeyboard(order.id) : orderPickupCookedKeyboard(order.id)},
        deliveryKeyboard: null,
        userKeyboard: null
      };
    case statuses.COOKED:
      return {
        message: t('messageOrderCooked'),
        shopKeyboard: null,
        deliveryKeyboard: {reply_markup: orderDeliveryKeyboard(order.id, 'si')},
        userKeyboard: null
      };
    case statuses.DELIVERY:
      return {
        message: t('messageOrderDelivery'),
        shopKeyboard: null,
        deliveryKeyboard: {reply_markup: orderCompleteKeyboard(order.id, 'si')},
        userKeyboard: null
      }
    case statuses.COMPLETE:
      return {
        message: order.type === deliveryTypes.DELIVERY ? t('messageOrderComplete') : t('messageOrderPickup'),
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
  console.log(order);

  const orderId = order.id;
  const messageData = getMessageData(order);
  const deliveryChat = -1001927483990 //TODO: REMOVE IT FROM HERE
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

    try {
      if (order?.telegram?.deliveryOrderMessage) await bot.api.deleteMessage(deliveryChat, order.telegram.deliveryOrderMessage);
    } catch (error) {
      console.error(error);
    }
  }

  const {message_id: shopOrderMessageNew} = await bot.api.sendMessage(shopChat, defaultOrderTemplate(order), messageData.shopKeyboard);

  const {message_id: userOrderMessageNew} = await bot.api.sendMessage(userChat, defaultOrderTemplate(order), messageData.userKeyboard);
  const {message_id: userTitleMessageNew} = await bot.api.sendMessage(userChat, messageData.message);

  let telegram = {
    shopOrderMessage: shopOrderMessageNew,
    userOrderMessage: userOrderMessageNew,
    userTitleMessage: userTitleMessageNew,
  };

  if(order.type === deliveryTypes.DELIVERY) {
    const {message_id: deliveryOrderMessageNew} = await bot.api.sendMessage(deliveryChat, deliveryOrderTemplate(order, 'si'), messageData.deliveryKeyboard);
    telegram.deliveryOrderMessage = deliveryOrderMessageNew;
  }

  let orderData = {
    ...order,
    telegram: {
      ...order.telegram,
      ...telegram
    }
  }

  await updateOrder(orderId, orderData);

  if (order.shopPosterPos) {
    if (order.status === statuses.DELIVERY || order.status === statuses.COMPLETE) {
      try {
        await updateIncomingOrder(order);
      } catch (e) {
        console.log(e)
      }
    }

    if (order.status === statuses.PENDING) {
      try {
        const posterOrder = await createIncomingOrder(orderData);

        orderData = {
          ...orderData,
          posterId: posterOrder.id.toString()
        }

        await updateOrder(orderId, orderData);
      } catch (e) {
        console.log(e);
      }
    }
  }

  console.log(orderData);
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