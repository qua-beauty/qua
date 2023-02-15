import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {load} from 'https://deno.land/std/dotenv/mod.ts';
import {orderMapper} from './mappers.js';

const env = await load();

const airtableBase = new Airtable({
  apiKey: env['AIRTABLE_API_KEY'],
  baseId: env['AIRTABLE_BASE'],
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