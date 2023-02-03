const firebase = require('firebase-admin');
const functions = require('firebase-functions');

exports.createCustomToken = functions.https.onRequest(async (request, response) => {
  functions.logger.log('Incoming message', request.body);
  const payload = request.body;

  try {
    const userId = payload.id;
    const token = await firebase.auth().createCustomToken(userId.toString());

    return response
      .set('Cache-Control', 'public, max-age=300, s-maxage=600')
      .send({
        statusCode: 200,
        body: {token},
      });
  } catch (e) {
    return response.send({
      statusCode: 400,
      body: 'uid not found'
    });
  }
});