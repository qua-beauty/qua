const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const serviceAccount = require('./cert.json');

initializeApp({
  credential: cert(serviceAccount),
  projectId: "lanka-496b2",
});

const firestore = getFirestore();

const checkOrdersUpdate = (userId) => {
  console.log(userId);

  firestore.collection("orders").where("user", "==", userId).orderBy("created")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
      });
    });
}

module.exports = {
  firestore,
  checkOrdersUpdate
};
