import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {actions} from './utils.js';
import {t} from './i18n.js';

const startKeyboard = (ctx) => new InlineKeyboard()
  .webApp(t('keyboardMarket', ctx.session.language), Deno.env.get('TWA_URL'));

const aboutKeyboard = (ctx) => new InlineKeyboard()
  .text(t('keyboardBack', ctx.session.language), actions.HOME);

const startShopKeyboard = (ctx, shopId) => new InlineKeyboard()
  .webApp(t('keyboardMarket', ctx.session.language), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

const shareAddressKeyboard = (ctx) => new Keyboard()
  .requestLocation(t('keyboardShareLocation', ctx.session.language))
  .oneTime();

const sharePhoneKeyboard = (ctx) => new Keyboard()
  .requestContact(t('keyboardSharePhone', ctx.session.language))
  .oneTime();

const orderShopKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardDeclineOrder', ctx.session.language), `${actions.SHOP_DECLINE_ORDER} ${orderId}`)
  .text(t('keyboardAcceptOrder', ctx.session.language), `${actions.SHOP_ACCEPT_ORDER} ${orderId}`);

const orderShopDeliveryKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardDeliveryOrder', ctx.session.language), `${actions.SHOP_DELIVERY_ORDER} ${orderId}`);

const orderShopDoneKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardCompleteOrder', ctx.session.language), `${actions.SHOP_DONE_ORDER} ${orderId}`);

const orderUserKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardCancelOrder', ctx.session.language), `${actions.CANCEL_ORDER} ${orderId}`);

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
