const {Scenes} = require('telegraf');
const {keyboards} = require('../keyboards.js');
const {messages} = require('../messages.js');
const {sceneNames} = require('../constants.js');

const startScene = new Scenes.BaseScene(sceneNames.START);

startScene.enter(async (ctx) => {
  await ctx.reply(messages.start, keyboards.start);
  ctx.scene.leave();
});

startScene.leave((ctx) => {
  console.log('User left start scene');
});

module.exports = {
  startScene
};