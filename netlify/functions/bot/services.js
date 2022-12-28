const {firestore} = require('./firebase.js');
const firebase = require('firebase-admin');

const createUserToken = async (userId) => {
  return await firebase.auth().createCustomToken(userId);
};

const getOrder = async (orderId) => {
  const orderRef = firestore.collection('orders').doc(orderId);
  const order = await orderRef.get().catch(e => console.log(e));

  return order.exists ? {
    ...order.data(),
    id: order.id
  } : null;
};

const updateOrder = async (orderId, data) => {
  const orderRef = firestore.collection('orders').doc(orderId);
  return await orderRef.update(data);
};

module.exports = {
  getOrder,
  createUserToken,
  updateOrder
};