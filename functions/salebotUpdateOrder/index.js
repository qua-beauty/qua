const {firestore} = require('../bot/firebase.js');

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const {order_id: orderId, status, ...rest} = payload;
    const orderRef = firestore.collection('orders').doc(orderId);

    await orderRef.update({
      status,
      ...rest
    });

    return {
      statusCode: 200
    };
  } catch (e) {
    return {statusCode: 400, body: 'Order_id not found'};
  }
};

module.exports = {handler};