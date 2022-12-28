const {Scenes} = require('telegraf');
const {Keyboard} = require('../keyboards.js');
const {Message} = require('../messages.js');
const {sceneNames} = require('../constants.js');

const start = new Scenes.BaseScene(sceneNames.START);

start.enter(async (ctx) => {
  await ctx.reply(Message.start, Keyboard.start);
  ctx.scene.leave();
});

start.leave((ctx) => {
  console.log('User left start scene');
});

module.exports = {
  start
};