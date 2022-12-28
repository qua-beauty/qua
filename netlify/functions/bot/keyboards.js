const {Markup} = require('telegraf');

const Keyboards = {
  start: Markup.inlineKeyboard([Markup.button.webApp(`Маркет`, process.env.TWA_URL)]).resize(true),
  orderDeliveryAddress: Markup.keyboard([Markup.button.locationRequest('Поделиться локацией')]).oneTime(true),
  orderPhoneNumber: Markup.keyboard([Markup.button.contactRequest('Поделиться телефоном')]).oneTime(true),
}

module.exports = {
  Keyboard: Keyboards
}
