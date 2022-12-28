const {Scenes} = require('telegraf');
const {keyboards} = require('../keyboards.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');

const start = new Scenes.BaseScene(sceneNames.START);

start.enter(async (ctx) => {
  await ctx.reply(messages.start, keyboards.start);
  ctx.scene.leave();
});

start.leave((ctx) => {
  console.log('User left start scene');
});

module.exports = {
  start
};