const {firestore} = require('./firebase.js');
const firebase = require('firebase-admin');

const getOrder = async (orderId) => {
  const orderRef = firestore.collection('orders').doc(orderId);
  const order = await orderRef.get().catch(e => console.log(e));
  console.log(order);

  return order.exists ? {
    ...order.data(),
    id: order.id
  } : null;
};

const createUserToken = async (userId) => {
  return await firebase.auth().createCustomToken(userId);
};

const updateOrder = async (orderRef, data) => {
  return await orderRef.update(data);
};

module.exports = {
  getOrder,
  createUserToken,
  updateOrder
};