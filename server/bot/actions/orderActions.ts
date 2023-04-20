import {getOrder, updateOrder} from '../../services/airtable.js';
import {orderCardMessage, statusByAction} from '../utils.js';
import {bot} from '../bot.js';
import {t} from "../i18n.js";
import {loadingKeyboard, orderShopDeliveryKeyboard, orderShopDoneKeyboard} from "../keyboards.js";

const getData = (order) => {
  switch(order.status) {
    case 'cook':
      return {
        message: t('messageOrderCooking'),
        keyboard: {reply_markup: orderShopDeliveryKeyboard(order.id)}
      };
    case 'delivery':
      return {
        message: t('messageOrderDelivering'),
        keyboard: { reply_markup: orderShopDoneKeyboard(order.id) }
      }
    case 'complete':
      return {
        message: t('messageOrderComplete'),
        keyboard: null
      }
    case 'declined':
      return {
        message: t('messageOrderDeclined'),
        keyboard: null
      }
    case 'cancelled':
      return {
        message: t('messageOrderCancelled'),
        keyboard: null
      }
  }
}

export const updateOrderAction = async (order) => {
  const orderId = order.id;
  const location = order.address.split(', ');
  const {userChat, adminChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;
  const statusData = getData(order);

  try {
    await bot.api.deleteMessage(adminChat, shopOrderMessage);
    await bot.api.deleteMessage(adminChat, shopAddressMessage);
    await bot.api.deleteMessage(userChat, userOrderMessage);
    await bot.api.deleteMessage(userChat, userTitleMessage);
  } catch (error) {
    console.error(error);
  }

  const {message_id: shopOrderMessageNew} = await bot.api.sendMessage(adminChat, orderCardMessage(order), statusData.keyboard);
  const {message_id: shopAddressMessageNew} = await bot.api.sendLocation(adminChat, location[0], location[1]);
  const {message_id: userOrderMessageNew} = await bot.api.sendMessage(userChat, orderCardMessage(order));
  const {message_id: userTitleMessageNew} = await bot.api.sendMessage(userChat, statusData.message);

  await updateOrder(orderId, {
    ...order,
    telegram: {
      ...order.telegram,
      status: order.status,
      userOrderMessage: userOrderMessageNew,
      userTitleMessage: userTitleMessageNew,
      shopOrderMessage: shopOrderMessageNew,
      shopAddressMessage: shopAddressMessageNew
    }
  });
};

export const orderAction = async (ctx) => {
  const action = ctx.update.callback_query.data.split(' ')[0];
  const orderId = ctx.update.callback_query.data.split(' ')[1];
  const order = await getOrder(orderId);

  await updateOrderAction({
    ...order,
    status: statusByAction[action]
  })
}