const currencies = {
  LKR: 'рупий'
}

const statuses = {
  pending: 'В обработке',
  cooking: 'Готовится',
  complete: 'Выполнен',
  decline: 'Отклонен'
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

export const getCurrencyTitle = (currency) => {
  return currencies.hasOwnProperty(currency) ? currencies[currency] : currencies['LKR'];
}

export const getShopUrl = (shopId) => {
  return `https://t.me/swamimarketbot?start=shop-${shopId}`;
}