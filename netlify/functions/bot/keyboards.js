const {Markup} = require('telegraf');
const {actionNames} = require('./constants.js');

const keyboards = {
  start: Markup.inlineKeyboard([Markup.button.webApp(`Маркет`, process.env.TWA_URL)]).resize(true),
  orderDeliveryAddress: Markup.keyboard([Markup.button.locationRequest('Поделиться локацией')]).oneTime(true),
  orderPhoneNumber: Markup.keyboard([Markup.button.contactRequest('Поделиться телефоном')]).oneTime(true),
  orderUserActions: (orderId) => Markup.inlineKeyboard([Markup.button.callback('Отменить заказ', `${actionNames.CANCEL_ORDER} ${orderId}`)]),
  removeKeyboard: Markup.removeKeyboard()
};

module.exports = {
  keyboards
};
