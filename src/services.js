import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import {auth, firestore} from './firebase.js';
import {webApp} from './telegram.js';

export const fetchAnswerWebQuery = async (messageText) => {
  await fetch('/api/answerWebAppQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      queryId: webApp.initDataUnsafe.query_id,
      id: webApp.initDataUnsafe.query_id,
      type: 'article',
      title: 'Order Created',
      input_message_content: {
        message_text: messageText,
      },
    })
  })
}

export const createNewOrder = async (data) => {
  const orderData = {
    ...data,
    user: auth.currentUser ? auth.currentUser.uid : null,
    created: new Date()
  };
  const ordersRef = collection(firestore, 'orders');
  const orderSnap = await addDoc(ordersRef, orderData);

  return {
    ...orderData,
    id: orderSnap.id
  };
};

export const getUserOrders = async (user) => {
  const basket = collection(firestore, 'orders');
  const q = query(basket, where('user', '==', user.uid));

  getDocs(q).then(docs => {
    const orders = [];
    docs.forEach((doc) => {
      orders.push({
        ...doc.data(),
        id: doc.id
      });
    });
    return orders;
  });
};