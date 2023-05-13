import {InlineKeyboard, Keyboard} from 'https://deno.land/x/grammy/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {actions, adminRoles} from './utils.js';
import {t} from './i18n.js';

export const startKeyboard = () => new InlineKeyboard()
  .webApp(t('keyboardMarket'), Deno.env.get('TWA_URL'));

export const aboutKeyboard = () => new InlineKeyboard()
  .text(t('keyboardBack'), actions.HOME);

export const startShopKeyboard = (shopId) => new InlineKeyboard()
  .webApp(t('keyboardMarket'), `${Deno.env.get('TWA_URL')}shop/${shopId}`);

export const shareAddressKeyboard = (orderId) => new Keyboard()
  .requestLocation(t('keyboardShareLocation')).row().oneTime()
  .text(t('keyboardPickup'), `${actions.ORDER_PICKUP} ${orderId}`).row();

export const sharePhoneKeyboard = () => new Keyboard()
  .requestContact(t('keyboardSharePhone'))
  .oneTime();

export const orderShopKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardDeclineOrder'), `${actions.ORDER_DECLINE} ${orderId}`)
  .text(t('keyboardAcceptOrder'), `${actions.ORDER_COOK} ${orderId}`);

export const orderCookedKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardCookedOrder'), `${actions.ORDER_COOKED} ${orderId}`);

export const orderPickupCookedKeyboard = (orderId, lng = 'ru') => new InlineKeyboard()
  .text(t('keyboardCookedOrder', lng), `${actions.ORDER_COMPLETE} ${orderId}`);

export const orderDeliveryKeyboard = (orderId, lng = 'ru') => new InlineKeyboard()
  .text(t('keyboardDeliveryOrder', lng), `${actions.ORDER_DELIVERY} ${orderId}`);

export const orderCompleteKeyboard = (orderId, lng = 'ru') => new InlineKeyboard()
  .text(t('keyboardCompleteOrder', lng), `${actions.ORDER_COMPLETE} ${orderId}`);

export const orderCloseKeyboard = (orderId, lng = 'ru') => new InlineKeyboard()
  .text(t('keyboardCloseOrder', lng), `${actions.ORDER_CLOSED} ${orderId}`);

export const orderUserKeyboard = (orderId) => new InlineKeyboard()
  .text(t('keyboardCancelOrder'), `${actions.ORDER_CANCEL} ${orderId}`);

export const adminKeyboard = () => new InlineKeyboard()
  .text(t('admin.keyboard.stat'), actions.ADMIN_STAT).row()
  .text(t('admin.keyboard.exit'), actions.ADMIN_EXIT).row()

export const adminStatKeyboard = () => new InlineKeyboard()
  .text(t('admin.keyboard.todayStat'), actions.ADMIN_STAT_TODAY).row()
  .text(t('admin.keyboard.yesterdayStat'), actions.ADMIN_STAT_YESTERDAY).row()
  .text(t('admin.keyboard.weekStat'), actions.ADMIN_STAT_WEEK).row()
  .text(t('admin.keyboard.monthStat'), actions.ADMIN_STAT_MONTH).row()
  .text(t('admin.keyboard.exit'), actions.ADMIN_EXIT).row()