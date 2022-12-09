const firebase = require('firebase-admin');
require('../bot/firebase.js');

const handler = async (event) => {
  try {
    const userId = JSON.parse(event.body).id;
    const token = await firebase.auth().createCustomToken(userId.toString());

    return {
      statusCode: 200,
      body: JSON.stringify({token})
    };
  } catch (e) {
    return {statusCode: 400, body: 'uid not found'};
  }
};

module.exports = {handler};