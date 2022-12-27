const {Scenes} = require('telegraf');
const {Keyboard} = require('../layouts/keyboard.js');
const {Message} = require('../layouts/message.js');
const startScene = new Scenes.BaseScene('WELCOME_SCENE');

startScene.enter((ctx) => {
  const {message_id, text, chat: {id}} = ctx.update.message;
  ctx.telegram.deleteMessage(id, message_id);
  ctx.reply(Message.start, Keyboard.start);
  ctx.scene.leave();
});

startScene.leave((ctx) => {
  console.log('User left start scene');
});

module.exports = {
  startScene
}