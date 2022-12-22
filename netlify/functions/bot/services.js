const {firestore} = require('./firebase.js');
const firebase = require('firebase-admin');

const getOrder = async (orderId) => {
  const orderRef = firestore.collection('orders').doc(orderId);
  const order = await orderRef.get();

  return order.exists ? {
    data: order.data(),
    ref: orderRef
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