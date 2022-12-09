const {firestore} = require('../bot/firebase.js');

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const userId = payload.user_id;
    const clientId = payload.client_id;
    const userRef = firestore.collection('users').doc(userId);

    await userRef.set({clientId});

    return {
      statusCode: 200
    };
  } catch (e) {
    return {statusCode: 400, body: 'uid not found'};
  }
};

module.exports = {handler};