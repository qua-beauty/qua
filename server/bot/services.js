import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {orderMapper} from './mappers.js';

const airtableBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'Orders'
});

const getOrder = async (orderId) => {
  if (orderId) {
    const order = await airtableBase.find(orderId);
    return orderMapper(order);
  }

  throw Error('No Order ID');
};

const updateOrder = async (orderId, data) => {
  console.log(data);
  const order = await airtableBase.update([{
    id: orderId,
    fields: {
      'Phone': data.phone,
      'Address': data.address,
      'Status': data.status.capitalize()
    }
  }]);

  console.log(order);
  return order;
};

export {
  getOrder,
  updateOrder
};