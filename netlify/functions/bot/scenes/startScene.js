const {Scenes} = require('telegraf');
const {Keyboard} = require('../keyboards.js');
const {Message} = require('../messages.js');
const startScene = new Scenes.BaseScene('WELCOME_SCENE');

startScene.enter((ctx) => {
  const {message_id, chat: {id: chat_id}} = ctx.update.message;
  ctx.reply(Message.start, Keyboard.start);
  ctx.telegram.deleteMessage(chat_id, message_id);
  ctx.scene.leave();
});

startScene.leave((ctx) => {
  console.log('User left start scene');
});

module.exports = {
  startScene
};