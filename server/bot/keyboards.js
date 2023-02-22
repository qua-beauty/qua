import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import {actions} from './utils.js';

const startKeyboard = new InlineKeyboard()
  .webApp('Маркет', Deno.env.get('TWA_URL'));

const startShopKeyboard = (shopId) => new InlineKeyboard()
  .webApp(`Маркет`, `${Deno.env.get('TWA_URL')}shop/${shopId}`);

const shareAddressKeyboard = new Keyboard()
  .requestLocation(`Поделиться локацией 📍`)
  .oneTime();

const sharePhoneKeyboard = new Keyboard()
  .requestContact(`Поделиться номером 📱`)
  .oneTime();

const orderShopKeyboard = (orderId) => new InlineKeyboard()
  .text('Отклонить заказ', `${actions.SHOP_DECLINE_ORDER} ${orderId}`)
  .text('Принять заказ', `${actions.SHOP_ACCEPT_ORDER} ${orderId}`);

const orderShopDoneKeyboard = (orderId) => new InlineKeyboard()
  .text('Заказ приготовлен', `${actions.SHOP_DONE_ORDER} ${orderId}`);

const orderDeliveryKeyboard = (orderId) => new InlineKeyboard()
  .text('Беру в доставку', `${actions.DELIVERY_ACCEPT_ORDER} ${orderId}`);

const orderUserKeyboard = (orderId) => new InlineKeyboard()
  .text('Отменить заказ', `${actions.CANCEL_ORDER} ${orderId}`);

export {
  startKeyboard,
  startShopKeyboard,
  sharePhoneKeyboard,
  shareAddressKeyboard,
  orderShopKeyboard,
  orderUserKeyboard,
  orderDeliveryKeyboard,
  orderShopDoneKeyboard
};
