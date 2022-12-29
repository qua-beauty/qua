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