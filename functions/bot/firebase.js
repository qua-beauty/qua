const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('./cert.json');

initializeApp({
  credential: cert(serviceAccount),
  projectId: 'lanka-496b2',
});

const firestore = getFirestore();

module.exports = {
  firestore
};
