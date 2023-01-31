const {Markup} = require('telegraf');
const {actionNames} = require('./constants.js');

const keyboards = {
  start: Markup.inlineKeyboard([Markup.button.webApp(`Маркет`, process.env.TWA_URL)]).resize(true),
  saveAddress: Markup.keyboard([Markup.button.locationRequest('Сохранить локацию 📍'), Markup.button.callback('Самодоставка 📦', 'selfDelivery'), Markup.button.callback('Сохранить и на главную 🏠', 'save')]).oneTime(true),
  auth: Markup.keyboard([Markup.button.contactRequest('Авторизоваться 📱')]).oneTime(true),
  orderShopActions: (orderId) => Markup.inlineKeyboard([
    Markup.button.callback('Отклонить заказ', `${actionNames.SHOP_DECLINE_ORDER} ${orderId}`),
    Markup.button.callback('Принять заказ', `${actionNames.SHOP_ACCEPT_ORDER} ${orderId}`)
  ]),
  orderUserActions: (orderId) => Markup.inlineKeyboard([
    Markup.button.callback('Отменить заказ', `${actionNames.CANCEL_ORDER} ${orderId}`)
  ]),
  removeKeyboard: Markup.removeKeyboard()
};

module.exports = {
  keyboards
};
