import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {actions} from './utils.js';

const startKeyboard = (ctx) => new InlineKeyboard()
  .webApp(ctx.i18n.t('keyboardMarket'), Deno.env.get('TWA_URL'))
  .row()
  .text(ctx.i18n.t('keyboardAbout'), actions.ABOUT);

const aboutKeyboard = (ctx) => new InlineKeyboard()
  .text(ctx.i18n.t('keyboardBack'), actions.HOME);

const startShopKeyboard = (ctx, shopId) => new InlineKeyboard()
  .webApp(ctx.i18n.t('keyboardMarket'), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

const shareAddressKeyboard = (ctx) => new Keyboard()
  .requestLocation(ctx.i18n.t('keyboardShareLocation'))
  .oneTime();

const sharePhoneKeyboard = (ctx) => new Keyboard()
  .requestContact(ctx.i18n.t('keyboardSharePhone'))
  .oneTime();

const orderShopKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(ctx.i18n.t('keyboardDeclineOrder'), `${actions.SHOP_DECLINE_ORDER} ${orderId}`)
  .text(ctx.i18n.t('keyboardAcceptOrder'), `${actions.SHOP_ACCEPT_ORDER} ${orderId}`);

const orderShopDeliveryKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(ctx.i18n.t('keyboardDeliveryOrder'), `${actions.SHOP_DELIVERY_ORDER} ${orderId}`);

const orderShopDoneKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(ctx.i18n.t('keyboardCompleteOrder'), `${actions.SHOP_DONE_ORDER} ${orderId}`);

const orderUserKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(ctx.i18n.t('keyboardCancelOrder'), `${actions.CANCEL_ORDER} ${orderId}`);

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
