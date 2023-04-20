import {Airtable} from 'https://deno.land/x/airtable@v1.1.1/mod.ts';
import {orderMapper, posterMapper, shopMapper, userMapper} from '../../shared/mappers.js';
import {serializeOrder, serializeUser} from '../../shared/serializers.js';

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

const airtablePosterPosBase = new Airtable({
  apiKey: Deno.env.get('AIRTABLE_API_KEY'),
  baseId: Deno.env.get('AIRTABLE_BASE'),
  tableName: 'PosterPos'
});

export const getUser = async (userId) => {
  try {
    const userData = await airtableUsersBase.select({
      maxRecords: 1,
      filterByFormula: `{TelegramId} = ${userId.toString()}`
    }).then(data => data.records);

    return userData.length > 0 ? userMapper(userData[0]) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getPosterPos = async (posterAccount) => {
  if (!posterAccount) {
    return null;
  }

  try {
    const posterData = await airtablePosterPosBase.select({
      maxRecords: 1,
      filterByFormula: `{Account} = "${posterAccount}"`
    }).then(data => posterMapper(data.records[0]));

    if (!posterData) {
      throw new Error(`Poster data not found for poster account: ${posterAccount}`);
    }

    return posterData;
  } catch (error) {
    console.error(`Error while retrieving poster data for account ${posterAccount}: ${error}`);
    return null;
  }
};

export const saveUser = async (userData) => {
  try {
    const user = await airtableUsersBase.create(serializeUser([userData])[0].fields);
    return userMapper(user);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error('No Order ID');
    }

    const orderData = await airtableOrdersBase.find(orderId);
    const order = orderMapper(orderData);

    const shopData = await airtableOrdersBase.find(order.shop);
    const shop = shopMapper(shopData);

    return {
      ...order,
      shop
    };
  } catch (error) {
    console.error(`Error in getOrder function: ${error}`);
    throw error;
  }
};

export const updateOrder = async (orderId, data) => {
  const orderData = serializeOrder([data]);
  const order = orderData[0];

  return await airtableOrdersBase.update([{
    id: orderId,
    fields: order.fields
  }]);
};