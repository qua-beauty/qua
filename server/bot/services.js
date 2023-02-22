import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {orderMapper, shopMapper} from './mappers.js';

const airtableBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'Orders'
});

const getOrder = async (orderId) => {
  if (orderId) {
    const orderData = await airtableBase.find(orderId);
    const order = orderMapper(orderData);

    const shopData = await airtableBase.find(order.shop);
    const shop = shopMapper(shopData);

    return {
      ...order,
      shop
    };
  }

  throw Error('No Order ID');
};

const updateOrder = async (orderId, data) => {
  const order = await airtableBase.update([{
    id: orderId,
    fields: {
      'Phone': data.phone,
      'Address': data.address,
      'Status': data.status.capitalize(),
      'Chat Id': data.chatId
    }
  }]);

  console.log(order);
  return order;
};

export {
  getOrder,
  updateOrder
};