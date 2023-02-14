const {bot} = require('./bot.js');

exports.handler = async event => {
  const payload = JSON.parse(event.body);

  try {
    await bot.api.answerWebAppQuery(payload.queryId, {
      ...payload
    }).catch(e => console.log(e));

    return {
      statusCode: 200,
      body: `OK`
    };

  } catch (e) {
    console.log(e);
    return {statusCode: 400, body: 'something wrong'};
  }
};
