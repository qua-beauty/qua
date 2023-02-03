const {bot} = require('./bot.js');
const functions = require('firebase-functions');

exports.answerWebAppQuery = functions.https.onRequest(async (request, response) => {
  functions.logger.log('Incoming message', request.body);
  const payload = request.body;

  try {
    await bot.telegram.answerWebAppQuery(payload.queryId, {
      ...payload
    });

    return response.set('Cache-Control', 'public, max-age=300, s-maxage=600').send({
      statusCode: 200,
      body: `OK`
    });

  } catch (e) {
    return response.send({statusCode: 400, body: 'something wrong'});
  }
});