const currencies = {
  LKR: 'рупий'
}

export const getCurrencyTitle = (currency) => {
  return currencies.hasOwnProperty(currency) ? currencies[currency] : currency;
}