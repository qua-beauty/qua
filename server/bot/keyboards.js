import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import {actions} from './utils.js';
import {i18n} from './i18n.js';

const startKeyboard = (ctx) => {
  return new InlineKeyboard()
    .webApp(ctx.t('keyboardMarket'), Deno.env.get('TWA_URL'))
    .row()
    .text(ctx.t('keyboardAbout'), actions.ABOUT);
}

const aboutKeyboard = new InlineKeyboard()
  .text(i18n().t('keyboardBack'), actions.HOME);

const startShopKeyboard = (shopId) => new InlineKeyboard()
  .webApp(i18n().t('keyboardMarket'), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

const shareAddressKeyboard = new Keyboard()
  .requestLocation(i18n().t('keyboardShareLocation'))
  .oneTime();

const sharePhoneKeyboard = new Keyboard()
  .requestContact(i18n().t('keyboardSharePhone'))
  .oneTime();

const orderShopKeyboard = (orderId) => new InlineKeyboard()
  .text(i18n().t('keyboardDeclineOrder'), `${actions.SHOP_DECLINE_ORDER} ${orderId}`)
  .text(i18n().t('keyboardAcceptOrder'), `${actions.SHOP_ACCEPT_ORDER} ${orderId}`);

const orderShopDeliveryKeyboard = (orderId) => new InlineKeyboard()
  .text(i18n().t('keyboardDeliveryOrder'), `${actions.SHOP_DELIVERY_ORDER} ${orderId}`);

const orderShopDoneKeyboard = (orderId) => new InlineKeyboard()
  .text(i18n().t('keyboardCompleteOrder'), `${actions.SHOP_DONE_ORDER} ${orderId}`);

const orderUserKeyboard = (orderId) => new InlineKeyboard()
  .text(i18n().t('keyboardCancelOrder'), `${actions.CANCEL_ORDER} ${orderId}`);

export {
  startKeyboard,
  aboutKeyboard,
  startShopKeyboard,
  sharePhoneKeyboard,
  shareAddressKeyboard,
  orderShopKeyboard,
  orderUserKeyboard,
  orderShopDoneKeyboard,
  orderShopDeliveryKeyboard
};
