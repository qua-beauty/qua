const getUser = (info) => {
  const {id, is_bot: isBot, first_name: firstName, last_name: lastName} = info;
  const name = (firstName ? firstName : '' + ' ' + lastName ? lastName : '').trim();
  return {id, isBot, name};
};

module.exports = async ctx => {
  const {id, isBot, name} = getUser(ctx.from);

  if (isBot) {
    return ctx.reply(`Sorry I only interact with humans!`);
  }

  try {
    ctx.reply(`Added ${name} to db!`);
  } catch (e) {
    return ctx.reply(`Error occured`);
  }

};