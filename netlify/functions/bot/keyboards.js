const {Markup} = require('telegraf');

const Keyboards = {
  start: Markup.inlineKeyboard([Markup.button.webApp(`Маркет`, process.env.TWA_URL)]).resize(true)
}

module.exports = {
  Keyboard: Keyboards
}
