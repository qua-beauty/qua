const fetch = require('node-fetch');

const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const clientId = payload.client_id;
    const orderId = payload.order_id;

    await fetch(`https://chatter.salebot.pro/api/${process.env.SALEBOT_API_TOKEN}/save_variables`, {
      method: 'POST',
      body: JSON.stringify({
        'client_id': clientId,
        'variables': {
          'client.order_id': orderId
        }
      })
    });

    await fetch(`https://chatter.salebot.pro/api/${process.env.SALEBOT_API_TOKEN}/callback`, {
      method: 'POST',
      body: JSON.stringify({
        'client_id': clientId,
        'message': `[OrderCreated] Создан заказ с корзиной #${orderId}`
      })
    });

    return {
      statusCode: 200,
      body: `clientId ${clientId}, orderId ${orderId}, OK`
    };

  } catch (e) {
    return {statusCode: 400, body: 'something wrong'};
  }
};

module.exports = {handler};