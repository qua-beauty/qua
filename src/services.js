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

export const fetchShops = async () => {
  const shops = [];

  await getDocs(collection(firestore, 'shops')).then(docs => {
    docs.forEach((doc) => {
      const data = doc.data();
      if(!data.disabled) {
        shops.push({
          id: doc.id,
          ...data
        });
      }
    });
  });

  return shops;
}

export const fetchCategories = async () => {
  const categories = [];

  await getDocs(collection(firestore, 'category')).then(docs => {
    docs.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
  });

  return categories;
}

export const fetchCatalog = async (shops, categories) => {
  const catalog = [];

  await getDocs(collection(firestore, 'catalog')).then(docs => {
    docs.forEach((doc) => {
      const data = doc.data();
      const cat = categories.filter(category => category.id === data.category[0])[0];
      const shop = shops.filter(shop => shop.id === data.shopId)[0];

      if(shop) {
        catalog.push({
          id: doc.id,
          icon: cat ? cat.icon : '',
          shop, // TODO: rewrite it
          shopTitle: shop ? shop.title : '',
          shopColor: shop ? shop.color : '',
          ...data
        });
      }
    });
  });

  return catalog;
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
      });
    });
    return orders;
  });
};