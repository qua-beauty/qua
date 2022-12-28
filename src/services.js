import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import {auth, firestore} from './firebase.js';
import {webApp, TWAMessages} from './telegram.js';

export const createOrder = async (data) => {
  const orderData = {
    ...data,
    user: auth.currentUser ? auth.currentUser.uid : null,
    created: new Date()
  };
  const ordersRef = collection(firestore, 'orders');
  const orderSnap = await addDoc(ordersRef, orderData);
  const order = {
    ...orderData,
    id: orderSnap.id
  };

  if (webApp) {
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
          message_text: TWAMessages.newOrder(order),
          parse_mode: 'MarkdownV2'
        },
      })
    })
  }

  return order;
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