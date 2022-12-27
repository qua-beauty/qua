const {Markup} = require('telegraf');

const Keyboards = {
  start: Markup.inlineKeyboard([Markup.button.url(`Маркет`, process.env.TWA_URL)])
}

module.exports = {
  Keyboard: Keyboards
}
