const Airtable = require("airtable");
const {orderMapper} = require('./mappers');

const airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE);

const ordersTable = 'Orders';

const getOrder = async (orderId) => {
  if(orderId) {
    const order = await airtableBase(ordersTable).find(orderId);
    return orderMapper(order);
  }

  throw Error('No Order ID');
};

const updateOrder = async (orderId, data) => {
  console.log(data);
  const order = await airtableBase(ordersTable).update([{
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

module.exports = {
  getOrder,
  updateOrder
};