const {Markup} = require('telegraf');

const Keyboards = {
  start: Markup.inlineKeyboard([
    [Markup.button.url(`Маркет`, `https://lankacafe.netlify.app`),],
  ])
}

module.exports = {
  Keyboard: Keyboards
}
