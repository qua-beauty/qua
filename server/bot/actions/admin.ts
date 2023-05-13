import {airtableFetch} from "../../services/airtableFetch.ts";
import {getMonthFormula, getTodayFormula, getWeekFormula, getYesterdayFormula} from "../formulas/dates.ts";
import {t} from '../i18n.js';
import {actions, periodByAction, statuses} from '../utils.js';
import {adminKeyboard, adminStatKeyboard} from '../keyboards.js';
import {orderMapper, telegramUserMapper} from '../../../shared/mappers.js';
import {getUser} from '../../services/airtable.js';
import {statTemplate} from '../templates.js';

const getOrdersData = async (filterByFormula) => {
  try {
    const orders = await airtableFetch('Orders', filterByFormula)
      .then((records) => records.map(record => orderMapper(record)));

    if (orders && orders.length > 0) {
      return orders.reduce(
        (acc, order) => {
          acc.sum += parseInt(order.price);
          acc.deliverySum += parseInt(order.deliveryPrice);
          acc.commissionSum += parseInt(order.commission);
          acc.shopSum[order.shopName] = (acc.shopSum[order.shopName] || 0) + parseInt(order.price);
          return acc;
        },
        {
          sum: 0,
          deliverySum: 0,
          commissionSum: 0,
          shopSum: {}
        }
      );
    }
  } catch(e) {
    console.error(e);
    return undefined;
  }

  return undefined;
}
export const adminStatPeriodAction = async (ctx) => {
  const {message: {message_id: messageId, chat: {id: chatId}}, from, data: period} = ctx.update.callback_query;
  const userData = telegramUserMapper(from);
  const user = await getUser(userData.id);

  if (!user.permissions) {
    await ctx.reply(t('admin.noPermission'));
    return;
  }

  let periodFormula;

  switch (period) {
    case actions.ADMIN_STAT_TODAY:
      periodFormula = getTodayFormula();
      break;
    case actions.ADMIN_STAT_YESTERDAY:
      periodFormula = getYesterdayFormula();
      break;
    case actions.ADMIN_STAT_WEEK:
      periodFormula = getWeekFormula();
      break;
    case actions.ADMIN_STAT_MONTH:
      periodFormula = getMonthFormula();
      break;
  }

  const filterByFormula = `AND({Status} = \'${statuses.CLOSED.capitalize()}\', ${periodFormula})`;
  const data = await getOrdersData(filterByFormula);

  ctx.api.editMessageText(chatId, messageId, statTemplate(periodByAction[period], data));
  ctx.api.editMessageReplyMarkup(chatId, messageId, {
    reply_markup: adminStatKeyboard()
  });
}

export const adminStatAction = async (ctx) => {
  const {message: {message_id: messageId, chat: {id: chatId}}, from} = ctx.update.callback_query;
  const userData = telegramUserMapper(from);
  const user = await getUser(userData.id);

  if (!user.permissions) {
    await ctx.reply(t('admin.noPermission'));
    return;
  }

  ctx.api.editMessageText(chatId, messageId, t('admin.stat'));
  ctx.api.editMessageReplyMarkup(chatId, messageId, {
    reply_markup: adminStatKeyboard()
  });
}

export const adminExitAction = async (ctx) => {
  const {message: {message_id: messageId, chat: {id: chatId}}} = ctx.update.callback_query;

  ctx.api.deleteMessage(chatId, messageId);
}

export const adminMenuAction = async (ctx) => {
  const {from} = ctx.update.message;
  const userData = telegramUserMapper(from);
  const user = await getUser(userData.id);

  if (!user.permissions) {
    await ctx.reply(t('admin.noPermission'));
    return;
  }

  await ctx.reply(t('admin.welcome'), {
    reply_markup: adminKeyboard()
  });
}