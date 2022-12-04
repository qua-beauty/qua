const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

initializeApp({
  credential: cert('/cert.json'),
  projectId: "lanka-496b2",
});

const firestore = getFirestore();

console.log(firestore);

module.exports = {
  firestore
};
