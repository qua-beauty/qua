const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBmvhBcdvJzBqbUdkAV7_ah1c0AXZtEmYc",
  authDomain: "lanka-496b2.firebaseapp.com",
  projectId: "lanka-496b2",
  storageBucket: "lanka-496b2.appspot.com",
  messagingSenderId: "452591030865",
  appId: "1:452591030865:web:b39ead8034fb16f9711e70",
  measurementId: "G-KB7LCN4M23"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

module.exports = {
  firestore
}
