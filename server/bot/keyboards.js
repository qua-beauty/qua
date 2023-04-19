import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {actions} from './utils.js';
import {t} from './i18n.js';

export const startKeyboard = (ctx) => new InlineKeyboard()
  .webApp(t('keyboardMarket', ctx.session.language), Deno.env.get('TWA_URL'));

export const aboutKeyboard = (ctx) => new InlineKeyboard()
  .text(t('keyboardBack', ctx.session.language), actions.HOME);

export const startShopKeyboard = (ctx, shopId) => new InlineKeyboard()
  .webApp(t('keyboardMarket', ctx.session.language), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

export const shareAddressKeyboard = (ctx) => new Keyboard()
  .requestLocation(t('keyboardShareLocation', ctx.session.language))
  .oneTime();

export const sharePhoneKeyboard = (ctx) => new Keyboard()
  .requestContact(t('keyboardSharePhone', ctx.session.language))
  .oneTime();

export const orderShopKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardDeclineOrder', ctx.session.language), `${actions.ORDER_DECLINE} ${orderId}`)
  .text(t('keyboardAcceptOrder', ctx.session.language), `${actions.ORDER_COOK} ${orderId}`);

export const orderShopDeliveryKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardDeliveryOrder', ctx.session.language), `${actions.ORDER_DELIVERY} ${orderId}`);

export const orderShopDoneKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardCompleteOrder', ctx.session.language), `${actions.ORDER_COMPLETE} ${orderId}`);

export const orderUserKeyboard = (ctx, orderId) => new InlineKeyboard()
  .text(t('keyboardCancelOrder', ctx.session.language), `${actions.ORDER_CANCEL} ${orderId}`);

export const loadingKeyboard = (ctx) => new InlineKeyboard()
  .text(t('keyboardLoading', ctx.session.language));

