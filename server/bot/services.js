import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {orderMapper, shopMapper, userMapper} from '../../shared/mappers.js';
import {serializeUser} from '../../shared/serializers.js';

const airtableOrdersBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'Orders'
});

const airtableUsersBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'Users'
});

const getUser = async (userId) => {
  try {
    const userData = await airtableUsersBase.select({
      maxRecords: 1,
      filterByFormula: `{TelegramId} = ${userId.toString()}`
    }).then(data => data.records)

    console.log(userData);

    return userMapper(userData[0]);
  } catch (e) {
    console.log(e);
    return null;
  }

}

const saveUser = async (userData) => {
  const user = await airtableOrdersBase.create(serializeUser([userData]))
  return userMapper(user);
}

const getOrder = async (orderId) => {
  if (orderId) {
    const orderData = await airtableOrdersBase.find(orderId);
    const order = orderMapper(orderData);

    const shopData = await airtableOrdersBase.find(order.shop);
    const shop = shopMapper(shopData);

    return {
      ...order,
      shop
    };
  }

  throw Error('No Order ID');
};

const updateOrder = async (orderId, data) => {
  return await airtableOrdersBase.update([{
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