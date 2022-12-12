import {getAuth, signOut} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmvhBcdvJzBqbUdkAV7_ah1c0AXZtEmYc",
  authDomain: "lanka-496b2.firebaseapp.com",
  projectId: "lanka-496b2",
  storageBucket: "lanka-496b2.appspot.com",
  messagingSenderId: "452591030865",
  appId: "1:452591030865:web:b39ead8034fb16f9711e70",
  measurementId: "G-KB7LCN4M23"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore();
export const siteUrl = 'https://lankacafe.netlify.app/';

export const logout = () => {
  signOut(auth);
};