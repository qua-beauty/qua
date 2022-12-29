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

export const fetchShops = async () => {
  const shops = [];

  await getDocs(collection(firestore, 'shops')).then(docs => {
    docs.forEach((doc) => {
      shops.push({
        id: doc.id,
        ...doc.data()
      });
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

      catalog.push({
        id: doc.id,
        icon: cat ? cat.icon : null,
        shopTitle: shop ? shop.title : null,
        shopColor: shop ? shop.color : null,
        ...data
      });
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