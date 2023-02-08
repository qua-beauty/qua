import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import {apiUrl, firestore} from './firebase.js';
import {webApp} from './telegram.js';

export const fetchAnswerWebQuery = async ({messageText, user}) => {
  await fetch(`${apiUrl}/api/answerWebAppQuery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.accessToken,
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
  console.log(data);
  const orderData = {
    ...data,
    user: webApp.initDataUnsafe.user.id,
    created: new Date()
  };
  const ordersRef = collection(firestore, 'orders');
  console.log(orderData);
  const orderSnap = await addDoc(ordersRef, orderData);
  console.log(orderSnap);
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