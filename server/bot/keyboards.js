import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {actions} from './utils.js';
import {t} from './i18n.js';

export const startKeyboard = () => new InlineKeyboard()
  .webApp(t('keyboardMarket'), Deno.env.get('TWA_URL'));

export const aboutKeyboard = () => new InlineKeyboard()
  .text(t('keyboardBack'), actions.HOME);

export const startShopKeyboard = (shopId) => new InlineKeyboard()
  .webApp(t('keyboardMarket'), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

export const shareAddressKeyboard = () => new Keyboard()
  .requestLocation(t('keyboardShareLocation'))
  .oneTime();

export const sharePhoneKeyboard = () => new Keyboard()
  .requestContact(t('keyboardSharePhone'))
  .oneTime();

export const orderShopKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardDeclineOrder'), `${actions.ORDER_DECLINE} ${orderId}`)
  .text(t('keyboardAcceptOrder'), `${actions.ORDER_COOK} ${orderId}`);

export const orderShopDeliveryKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardDeliveryOrder'), `${actions.ORDER_DELIVERY} ${orderId}`);

export const orderShopDoneKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardCompleteOrder'), `${actions.ORDER_COMPLETE} ${orderId}`);

export const orderUserKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardCancelOrder'), `${actions.ORDER_CANCEL} ${orderId}`);

export const loadingKeyboard = () => new InlineKeyboard()
  .text(t('keyboardLoading'));

