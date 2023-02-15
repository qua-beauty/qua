import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import { load } from "https://deno.land/std/dotenv/mod.ts";
import {actions} from './utils.js';

const env = await load();

const startKeyboard = new InlineKeyboard()
  .webApp('Маркет', env['TWA_URL']);

const startShopKeyboard = (shopId) => new InlineKeyboard()
  .webApp(`Маркет`, `${env['TWA_URL']}shop/${shopId}`);

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
  .text('Отклонить заказ', `${actions.SHOP_DECLINE_ORDER} ${orderId}`)
  .text('Принять заказ', `${actions.SHOP_ACCEPT_ORDER} ${orderId}`);

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
