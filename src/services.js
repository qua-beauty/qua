import {collection, doc, getDoc, addDoc, query, where, getDocs} from 'firebase/firestore';
import {auth, firestore} from './firebase.js';



export const createOrder = async (order) => {
  const ordersRef = collection(firestore, 'orders');
  const orderSnap = await addDoc(ordersRef, {
    ...order,
    user: auth.currentUser ? auth.currentUser.uid : null
  });

  return {
    ...order,
    id: orderSnap.id
  }
}

export const getUserOrders = async (user) => {
  const basket = collection(firestore, 'orders');
  const q = query(basket, where('user', '==', user.uid));

  getDocs(q).then(docs => {
    const orders = [];
    docs.forEach((doc) => {
      orders.push({
        ...doc.data(),
        id: doc.id
      })
    });
    return orders;
  });
}