import {getOrder, updateOrder} from '../../services/airtable.js';
import {orderCardMessage} from '../utils.js';
import {t} from '../i18n.js';
import {orderShopDeliveryKeyboard} from '../keyboards.js';
import {bot} from '../bot.js';

const shopAcceptOrder = async (orderId) => {
  const order = await getOrder(orderId);
  const language = 'ru';
  const location = order.address.split(', ');
  const {userChat, adminChat, userOrderMessage, userTitleMessage, shopOrderMessage, shopAddressMessage} = order.telegram;

  try {
    await bot.api.deleteMessage(adminChat, shopOrderMessage);
    await bot.api.deleteMessage(adminChat, shopAddressMessage);
    await bot.api.deleteMessage(userChat, userOrderMessage);
    await bot.api.deleteMessage(userChat, userTitleMessage);
  } catch (e) {
    console.log(e);
  }

  const {message_id: shopOrderMessageNew} = await bot.api.sendMessage(adminChat, orderCardMessage(order, {session: { language }}), {
    reply_markup: orderShopDeliveryKeyboard({session: { language }}, orderId)
  });
  const {message_id: shopAddressMessageNew} = await bot.api.sendLocation(adminChat, location[0], location[1]);
  const {message_id: userOrderMessageNew} = await bot.api.sendMessage(userChat, orderCardMessage(order, {session: { language }}));
  const {message_id: userTitleMessageNew} = await bot.api.sendMessage(userChat, t('messageOrderCooking', language));

  await updateOrder(orderId, {
    ...order,
    status: 'cook',
    telegram: {
      ...order.telegram,
      userOrderMessage: userOrderMessageNew,
      userTitleMessage: userTitleMessageNew,
      shopOrderMessage: shopOrderMessageNew,
      shopAddressMessage: shopAddressMessageNew
    }
  });
};

export default shopAcceptOrder;