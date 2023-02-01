import {siteUrl} from './firebase.js';

const currencies = {
  LKR: 'рупий'
}

const statuses = {
  pending: 'В обработке',
  cooking: 'Готовится',
  complete: 'Выполнен',
  decline: 'Отклонен'
}

export const getCurrencyTitle = (currency) => {
  return currencies.hasOwnProperty(currency) ? currencies[currency] : currencies['LKR'];
}

export const getStatusTitle = (status) => {
  return statuses.hasOwnProperty(status) ? statuses[status] : status;
}

export const getShopUrl = (shopId) => {
  return `https://t.me/swamimarketbot?start=openShop-${shopId}`;
}