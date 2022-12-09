const firebase = require('firebase-admin');
const {initializeApp, cert} = require('firebase-admin/app');
const serviceAccount = require('./cert.json');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

initializeApp({
  credential: cert(serviceAccount),
  projectId: 'lanka-496b2',
  storageBucket: 'lanka-496b2.appspot.com',
});

const handler = async (event) => {
  try {
    const userId = JSON.parse(event.body).id;
    const token = await firebase.auth().createCustomToken(userId.toString());

    return {
      headers: CORS_HEADERS,
      statusCode: 200,
      body: JSON.stringify({token})
    };
  } catch (e) {
    return {statusCode: 400, body: 'uid not found'};
  }
};

module.exports = {handler};