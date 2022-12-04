const firebase = require('firebase-admin');
const {initializeApp} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

initializeApp({
  credential: firebase.credential.cert({
    'type': 'service_account',
    'project_id': process.env.FIREBASE_PROJECT_ID,
    'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
    'private_key': process.env.FIREBASE_PRIVATE_KEY,
    'client_email': process.env.FIREBASE_CLIENT_EMAIL,
    'client_id': process.env.FIREBASE_CLIENT_ID,
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': 'https://oauth2.googleapis.com/token',
    'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
    'client_x509_cert_url': process.env.CLIENT_X509_CERT_URL
  }),
  authDomain: "lanka-496b2.firebaseapp.com",
  projectId: "lanka-496b2",
  storageBucket: "lanka-496b2.appspot.com",
  messagingSenderId: "452591030865",
  appId: "1:452591030865:web:b39ead8034fb16f9711e70",
  measurementId: "G-KB7LCN4M23"
});

const firestore = getFirestore();

module.exports = {
  firestore
};
