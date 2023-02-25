import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {orderMapper, shopMapper, userMapper} from '../../shared/mappers.js';
import {serializeUser} from '../../shared/serializers.js';

const airtableBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'Orders'
});

const getUser = async (userId) => {
  console.log(userId);
  const userData = await airtableBase.find(userId);
  console.log(userData);
  return userData ? userMapper(userData) : null;
}

const saveUser = async (userData) => {
  const user = await airtableBase.create(serializeUser([userData]))
  return userMapper(user);
}

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
  return await airtableBase.update([{
    id: orderId,
    fields: {
      'Phone': data.phone,
      'Address': data.address,
      'Status': data.status.capitalize(),
      'Telegram': JSON.stringify(data.telegram),
      'Username': data.username
    }
  }]);
};

export {
  getOrder,
  updateOrder,
  saveUser,
  getUser
};